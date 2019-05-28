module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/_build/content/`,
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    'gatsby-plugin-offline',
  ],
}