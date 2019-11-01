const READY_FOR_PRODUCTION = "Ready for Live Site"

// Articles in draft should not be deployed to production. An article is draft if the draftreason for the article
// is anything other than "Ready for production" - see ONS-359.
//
// We also use this Draft Excluder concept to not show articles that are for the call centre only.
//
// Initially this was done using the draft tag. This technique might be removed in the future.
exports.excludeDraftArticle = node => {
  return Boolean(
    process.env.EXCLUDE_DRAFTS && (
      (
        node.frontmatter.tags &&
        node.frontmatter.tags.includes("draft")
      ) || (
        node.frontmatter.draftreason &&
        node.frontmatter.draftreason !== READY_FOR_PRODUCTION
      ) || node.frontmatter.cconly
    )
  )
}
