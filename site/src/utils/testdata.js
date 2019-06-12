export const data = {
  edges: [
    {
      node: {
        frontmatter: {
          title: "test Article1 ",
          description: "testDescription",
          priority: 1,
          date: new Date()
        },
        fields: {
          pagename: "test-article-1",
          collection: "articles"
        }
      }
    },
    {
      node: {
        frontmatter: {
          title: "test Article 2",
          description: "testDescription",
          priority: 0,
          date: new Date()
        },
        fields: {
          pagename: "test-article-2",
          collection: "articles"
        }
      }
    },
    {
      node: {
        frontmatter: {
          title: "test Directory 3",
          description: "testDescription",
          priority: 0,
          date: new Date()
        },
        fields: {
          pagename: "test-directory-1",
          collection: "directories"
        }
      }
    }
  ]
}

export const articleNode = data.edges[0].node
export const directoryNode = data.edges[2].node
export const articleList = { edges: data.edges.slice(0, 2) }
