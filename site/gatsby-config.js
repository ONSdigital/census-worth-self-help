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
        // Set of article fields we search on.
        fields: [`title`, `description`, `author`, `tags`, `body`],
        resolvers: {
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
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        runtimeCaching: [
          {
            urlPattern: /cms.js$/,
            handler: `cacheFirst`,
            options: {
              cacheName: 'netlify-cms',
              expiration: {
                maxAgeSeconds: 3600,
                purgeOnQuotaError: true,
              }
            }
          },
          {
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `cacheFirst`,
          },
          {
            urlPattern: /.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `staleWhileRevalidate`,
          }
        ]
      },
    }
  ],
}

if (!process.env.DISABLED_NETLIFY) {
  module.exports.plugins.push("gatsby-plugin-netlify-cms");
}