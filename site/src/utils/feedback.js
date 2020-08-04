export default class Feedback {
  static bookmarkClickEvent(article) {
    Feedback.feedbackEvent("click-event", "bookmark", article)
  }
  static articleWasBookmarked(article) {
    Feedback.feedbackEvent("article-was-bookmarked", "bookmarked", article, 1)
  }
  static articleWasUnBookmarked(article) {
    Feedback.feedbackEvent("article-was-bookmarked", "unbookmarked", article, 1)
  }
  static articleIsUseful(article, reason) {
    Feedback.feedbackEvent(
        "article-feedback-review",
        "POSITIVE REVIEW: " + article,
        reason
    )
    Feedback.feedbackEvent("article-feedback-rating", "rating", article, 1)
  }
  static articleIsNotUseful(article, reason) {
    Feedback.feedbackEvent(
      "article-feedback-review",
      "REVIEW: " + article,
      reason
    )
    Feedback.feedbackEvent("article-feedback-rating", "rating", article, -1)
  }
  static feedbackEvent(category, action, name = "", value = "") {
    if (window._paq) {
      window._paq.push(["trackEvent", category, action, name, value])
    }
  }
}
