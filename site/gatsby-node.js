const { excludeDraftArticle } = require(`./src/utils/draft-excluder`)

const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = (props) => {
  // This function permanently adds the following values to our graphql queries.
  // collection - this tells us which collection the .md is from
  // pagename - based on the filename, this will be the url of the .md in the interface
  let { node, actions } = props
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const parsedPath = path.parse(node.fileAbsolutePath)
    let collection = path.parse(parsedPath.dir).base
    if ( collection === 'articles' && excludeDraftArticle(node) ) {
      collection = 'draft'
    }
    const filename = parsedPath.name

    createNodeField({
      node,
      name: `collection`,
      value: collection,
    })
    createNodeField({
      node,
      name: `pagename`,
      value: filename,
    })
  }
}

function fetchArticlesAndDirectories(data) {

  let directories = []
  let articles = []
  data.forEach(({ node }) => {
    if( node.fields.collection === 'articles')
    {
      articles.push(
        {node : node,
         title : node.frontmatter.title,
         link : node.fields.pagename,
         parent_title : node.frontmatter.directory,
         breadcrumbs: [],
         type: "article"})
    } else if( node.fields.collection === 'directories' && node.frontmatter.directory ) {
      directories.push(
        { node : node,
         title : node.frontmatter.title,
         description : node.frontmatter.description,
         link : node.fields.pagename,
         parent_title : node.frontmatter.directory,
         resolved : false,
         children: [],
         breadcrumbs: [],
         type: "directory"})
    }
  })
  return {articles: articles, directories: directories}
}

function connectDirectoriesTogether(directories) {
  // Directories is a list of the directories with only the root element resolved.
  // We loop through the list of directories, each time we will connect one layer further until we find no more layers.
  // If there are any loops that do not get connected to the root, they will not be included.
  let searchAgain = true
  while(searchAgain)
  {
    searchAgain = false
    directories.forEach(( directory ) => {
      if (directory.resolved === false) {
        let parent = directories.find( (parent) => parent.title === directory.parent_title )
        if( parent !== undefined && parent.resolved)
        {
          searchAgain = true
          directory.resolved = true
          directory.parent = parent
          parent.children.push(directory)
          directory.breadcrumbs = parent.breadcrumbs.slice() // shallow copy
          directory.breadcrumbs.push({title: parent.title, link: parent.link})
        }
      }
    })
  }
}

function combineArticlesAndDirectories(articles, directories) {
  articles.forEach(( article ) => {
    let parent = directories.find( (parent) => parent.title === article.parent_title )
    if( parent !== undefined)
    {
      article.parent = parent
      parent.children.push(article)
      article.breadcrumbs = parent.breadcrumbs.slice() // shallow copy
      article.breadcrumbs.push({title: parent.title, link: parent.link})
    }
  })
}

function createMenuPage(createPage, rootDirectory) {
  // The tree we need for the menu starts at the root and recurses down.
  let menuRecursion = function(directory, menutree) {
    let menutreeElement = {title: directory.title, link: directory.link}
    // filter out articles as they don't appear in menus. Then recurse over the rest of the children
    menutreeElement.children = directory.children.filter(
                                 (child) => child.type === "directory"
                              ).map( (child) => menuRecursion(child, menutreeElement))
    return menutreeElement
  }
  let menutree = menuRecursion(rootDirectory, [])

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
      peers = article.parent.children.map( (child) => { return { title: child.title, link: child.link } } )
    }
    createPage({
        path: article.link,
        component: path.resolve(`./src/templates/standard-article.js`),
        context: {
          id: article.node.id,    
          title : article.title,
          peers : peers,
          breadcrumbs : article.breadcrumbs}
    })
  })
}

function sortDirectoriesByPriority(directories)
{
  directories.forEach(( directory ) => {
    directory.children.sort( (child_a, child_b) => {
      return child_a.node.frontmatter.priority - child_b.node.frontmatter.priority;
    });
  })
}

function createDirectoryPages(createPage, directories)
{
  directories.forEach(( directory ) => {
    // Figure out ancestors, peers, and children before creating directory pages.
    let children = directory.children.map( (child) => { return { node: child.node } } )
    let peers = []
    if(directory.parent)
    {
      peers = directory.parent.children.map( (child) => { return {title: child.title, link: child.link} })
    }

    createPage({
      path: directory.link,
      component: path.resolve(`./src/templates/standard-directory.js`),
      context: {
        title : directory.title,
        description : directory.node ? directory.node.frontmatter.description : undefined,
        children : children,
        peers : peers,
        breadcrumbs : directory.breadcrumbs
      },
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  if (!process.env.DISABLE_NETLIFY) {
    console.log("Report page included in deployment")
    createPage({
      path: `/report`,
      component: path.resolve(`./src/extra/report.js`),
    })
  }

  return graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          fileAbsolutePath
          fields {
            collection
            pagename
          }
          frontmatter {
            title
            directory
            priority
            date
            description
            tags
          }
        }
      }
    }
  }
  `
).then(result => {

    let {directories, articles} = fetchArticlesAndDirectories(result.data.allMarkdownRemark.edges)

    let rootDirectory = {title : 'Root', resolved : true, parent: null, children: [], breadcrumbs: [], link: "explore/"}
    directories.push(rootDirectory)

    connectDirectoriesTogether(directories)
    combineArticlesAndDirectories(articles, directories)
    sortDirectoriesByPriority(directories)

    createMenuPage(createPage, rootDirectory)
    createArticlePages(createPage, articles)
    createDirectoryPages(createPage, directories)
  })
}