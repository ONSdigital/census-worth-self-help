exports.excludeDraftArticle = (node) => {
  return Boolean(process.env.EXCLUDE_DRAFTS && node.frontmatter.tags && node.frontmatter.tags.includes("draft"))
}