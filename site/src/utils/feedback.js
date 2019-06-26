export default class Feedback {
  static articleIsUseful(article) {
    Feedback.feedbackEvent("article-feedback", "positive", article)
  }
  static articleIsNotUseful(article, reason) {
    Feedback.feedbackEvent("article-feedback", "negative", article, reason)
  }
  static feedbackEvent(category, action, name = "", value = "") {
    console.log(["trackEvent", category, action, name, value])
    if (window._paq) {
      window._paq.push(["trackEvent", category, action, name, value])
    }
  }
}
