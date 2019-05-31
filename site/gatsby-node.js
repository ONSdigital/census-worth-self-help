const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

function fetchArticlesAndRepos(data) {

  let repos = []
  let articles = []
  data.forEach(({ node }) => {

    const parsedPath = path.parse(node.fileAbsolutePath)
    const filename = parsedPath.base
    const directory = path.parse(parsedPath.dir).base

    if( directory === 'articles')
    {
      articles.push(
        {title : node.frontmatter.title,
         parent_title : node.frontmatter.repo,
         link: filename,
         breadcrumbs: [],
         type: "article"})
    } else if( directory === 'repos' && node.frontmatter.repo ) {
      repos.push(
        {title : node.frontmatter.title,
         parent_title : node.frontmatter.repo,
         resolved : false,
         children: [],
         breadcrumbs: [],
         link: filename,
         type: "repo"})
    }
  })
  return {articles: articles, repos: repos}
}

function connectReposTogether(repos) {
  // Repos is a list of the directories with only the root element resolved.
  // We loop through the list of repos, each time we will connect one layer further until we find no more layers.
  // If there are any loops that do not get connected to the root, they will not be included.
  let searchAgain = true
  while(searchAgain)
  {
    searchAgain = false
    repos.forEach(( repo ) => {
      if (repo.resolved === false) {
        let parent = repos.find( (parent) => parent.title === repo.parent_title )
        if( parent !== undefined && parent.resolved)
        {
          searchAgain = true
          repo.resolved = true
          repo.parent = parent
          parent.children.push(repo)
          repo.breadcrumbs = parent.breadcrumbs.slice() // shallow copy
          repo.breadcrumbs.push({title: parent.title, link: parent.link})
        }
      }
    })
  }
}

function combineArticlesAndRepos(articles, repos) {
  articles.forEach(( article ) => {
    let parent = repos.find( (parent) => parent.title === article.parent_title )
    if( parent !== undefined)
    {
      article.parent = parent
      parent.children.push(article)
      article.breadcrumbs = article.breadcrumbs.slice() // shallow copy
      article.breadcrumbs.push({title: parent.title, link: parent.link})
    }
  })
}

function createMenuPage(createPage, rootRepo) {
  // The tree we need for the menu starts at the root and recurses down.
  let menuRecursion = function(repo, menutree) {
    let menutreeElement = {title: repo.title, link: repo.link}
    menutreeElement.children = repo.children.map( (child) => menuRecursion(child, menutreeElement))
    return menutreeElement
  }
  let menutree = menuRecursion(rootRepo, [])

  createPage({
      path: "menu",
      component: path.resolve(`./src/templates/menu-template.js`),
      context: {
        menutree : menutree.children}
  })
}

function createArticlePages(createPage, articles) {
  articles.forEach(( article ) => {
    let peers = []
    if(article.parent)
    {
      peers = article.parent.children.map( (child) => { return {title: child.title, link: child.link} })
    }
    createPage({
        path: article.link,
        component: path.resolve(`./src/templates/standard-article.js`),
        context: {
          title : article.title, 
          peers : peers,
          breadcrumbs : article.breadcrumbs}
    })
  })
}

function createRepoPages(createPage, repos)
{
  repos.forEach(( repo ) => {
    // Figure out ancestors, peers, and children before creating repo pages.
    let children = repo.children.map( (child) => { return { title: child.title, link: child.link, type: child.type} })
    let peers = []
    if(repo.parent)
    {
      peers = repo.parent.children.map( (child) => { return {title: child.title, link: child.link} })
    }

    createPage({
      path: repo.link,
      component: path.resolve(`./src/templates/standard-repo.js`),
      context: {
        title : repo.title,
        children : children,
        peers : peers,
        breadcrumbs : repo.breadcrumbs
      },
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            title
            repo
          }
        }
      }
    }
  }
  `
).then(result => {

    let {repos, articles} = fetchArticlesAndRepos(result.data.allMarkdownRemark.edges)

    let rootRepo = {title : 'Root', resolved : true, parent: null, children: [], breadcrumbs: [], link: "explore"}
    repos.push(rootRepo)

    connectReposTogether(repos)

    createMenuPage(createPage, rootRepo)

    combineArticlesAndRepos(articles, repos)

    createArticlePages(createPage, articles)

    createRepoPages(createPage, repos)
  })
}