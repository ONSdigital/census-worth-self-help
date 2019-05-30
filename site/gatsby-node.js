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

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {

      const parsedPath = path.parse(node.fileAbsolutePath)
      const filename = parsedPath.base
      // check repos
      const directory = path.parse(parsedPath.dir).base

      if( directory === 'articles')
      {
        createPage({
          path: filename,
          component: path.resolve(`./src/templates/standard-article.js`),
          context: {title : node.frontmatter.title},
        })
      } else if( directory === 'repos' && node.frontmatter.repo ) {
        repos.push({title : node.frontmatter.title, parent_title : node.frontmatter.repo, resolved : false, children: [], link: filename})
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

    let breadcrumbRecursion = function(repo, breadcrumbs) {
      if(repo.parent)
      {
        breadcrumbs = breadcrumbRecursion(repo.parent, breadcrumbs)
      }
      breadcrumbs.push({title: repo.title, link: repo.link})
      return breadcrumbs
    }
    repos.forEach(( repo ) => {

      let children = repo.children.map( (child) => { return { title: child.title, link: child.link} })
      let peers = []
      let breadcrumbs = []
      if(repo.parent)
      {
        peers = repo.parent.children.map( (child) => { return {title: child.title, link: child.link} })
        breadcrumbs = breadcrumbRecursion(repo.parent, [])
      }

      console.log(repo.link)
      console.log(children)
      console.log(peers)
      console.log(breadcrumbs)

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