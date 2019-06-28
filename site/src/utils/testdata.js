export const data = {
  edges: [
    {
      node: {
        frontmatter: {
          title: "test Article 1",
          description: "testDescription",
          priority: 1,
          date: new Date(),
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
          date: new Date(),
          tags: ["popular"]
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
          title: "test Article 3",
          description: "testDescription",
          priority: 0,
          date: new Date(),
          tags: ["popular"]
        },
        fields: {
          pagename: "test-article-3",
          collection: "articles"
        }
      }
    },
    {
      node: {
        frontmatter: {
          title: "test Article 4",
          description: "testDescription",
          priority: 0,
          date: new Date()
        },
        fields: {
          pagename: "test-article-4",
          collection: "articles"
        }
      }
    },
    {
      node: {
        frontmatter: {
          title: "test Article 5",
          description: "testDescription",
          priority: 0,
          date: new Date(),
          tags: ["popular"]
        },
        fields: {
          pagename: "test-article-5",
          collection: "articles"
        }
      }
    },
    {
      node: {
        frontmatter: {
          title: "test Article 6",
          description: "testDescription",
          priority: 0,
          date: new Date(),
          tags: ["popular"]
        },
        fields: {
          pagename: "test-article-6",
          collection: "articles"
        }
      }
    },
    {
      node: {
        frontmatter: {
          title: "test Directory 7",
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
export const popularList = { edges: [ data.edges[1], data.edges[2], data.edges[4], data.edges[5] ] }
export const articleList = { edges: data.edges.slice(0, 6) }
