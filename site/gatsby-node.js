const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)


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
    // will fail if no .md files in /content

    let repos = []
    let articles = []

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {

      const parsedPath = path.parse(node.fileAbsolutePath)
      const filename = parsedPath.base
      // check repos
      const directory = path.parse(parsedPath.dir).base

      if( directory === 'articles')
      {
        articles.push(
          {title : node.frontmatter.title,
           parent_title : node.frontmatter.repo,
           link: filename,
           type: "article"})
      } else if( directory === 'repos' && node.frontmatter.repo ) {
        repos.push(
          {title : node.frontmatter.title,
           parent_title : node.frontmatter.repo,
           resolved : false,
           children: [],
           link: filename,
           type: "repo"})
      }
    })


    // Starting from the root connect up all the parents to children and vice versa
    repos.push({title : 'Root', resolved : true, parent: null, children: [], link: "explore"})
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
          }
        }
      })
    }

    // TODO: build menu here


    // Add articles to repos
    articles.forEach(( article ) => {
      let parent = repos.find( (parent) => parent.title === article.parent_title )
      if( parent !== undefined)
      {
        article.parent = parent
        parent.children.push(article)
        console.log("found parent")
      }
    })

    // Figure out ancestors, peers, and children before creating repo pages.
    let breadcrumbRecursion = function(repo, breadcrumbs) {
      if(repo.parent)
      {
        breadcrumbs = breadcrumbRecursion(repo.parent, breadcrumbs)
      }
      breadcrumbs.push({title: repo.title, link: repo.link})
      return breadcrumbs
    }

    articles.forEach(( article ) => {

      let peers = []
      let breadcrumbs = []
      if(article.parent)
      {
        peers = article.parent.children.map( (child) => { return {title: child.title, link: child.link} })
        breadcrumbs = breadcrumbRecursion(article.parent, [])
      }

      createPage({
          path: article.link,
          component: path.resolve(`./src/templates/standard-article.js`),
          context: {
            title : article.title, 
            peers : peers,
            breadcrumbs : breadcrumbs}
      })
    })

    
    repos.forEach(( repo ) => {

      let children = repo.children.map( (child) => { return { title: child.title, link: child.link, type: child.type} })
      let peers = []
      let breadcrumbs = []
      if(repo.parent)
      {
        peers = repo.parent.children.map( (child) => { return {title: child.title, link: child.link} })
        breadcrumbs = breadcrumbRecursion(repo.parent, [])
      }

      createPage({
        path: repo.link,
        component: path.resolve(`./src/templates/standard-repo.js`),
        context: {
          title : repo.title,
          children : children,
          peers : peers,
          breadcrumbs : breadcrumbs
        },
      })
    })
  })
}