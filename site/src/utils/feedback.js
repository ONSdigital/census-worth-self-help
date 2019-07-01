export default class Feedback {
  static articleIsUseful(article) {
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
