import Analytics from "./analytics"

export default class SearchAnalytics {
  static querySearched(query) {
    Analytics.trackEvent(
      "search",
      "query",
      query
    )
  }
}