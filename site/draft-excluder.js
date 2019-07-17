const filterDraftArticles = process.env.EXCLUDE_DRAFTS ? true : false

exports.excludeDraftArticle = (node) => {
  return filterDraftArticles && node.frontmatter.tags && node.frontmatter.tags.includes("draft")
}