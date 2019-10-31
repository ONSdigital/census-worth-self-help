const READY_FOR_PRODUCTION = "Ready for production"

exports.excludeDraftArticle = node => {
  return Boolean(
    process.env.EXCLUDE_DRAFTS && (
      (
        node.frontmatter.tags &&
        node.frontmatter.tags.includes("draft")
      ) || (
        node.frontmatter.draftreason &&
        node.frontmatter.draftreason !== READY_FOR_PRODUCTION
      )
    )
  )
}
