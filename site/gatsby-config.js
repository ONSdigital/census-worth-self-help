module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/_build/content/`,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `description`, `author`, `tags`, `body`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            description: node => node.frontmatter.description,
            author: node => node.frontmatter.author,
            tags: node => node.frontmatter.tags,
            body: node => node.rawMarkdownBody
          },
        },
        // Remove .md with no content
        filter: (node, getNode) => {
          return node.rawMarkdownBody.trim() != ""
        },
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    'gatsby-plugin-offline',
  ],
}