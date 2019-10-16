import Analytics from "./analytics"

export default class SearchAnalytics {
  static trackSiteSearch(keyword, category, searchCount) {
    Analytics.trackEvent(
      "search",
      "query",
      keyword
    )
    Analytics.trackSiteSearch(keyword, category, searchCount)
  }
}