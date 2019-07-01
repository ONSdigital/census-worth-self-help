import Feedback from "../feedback"

describe("Feedback", () => {
  beforeEach(() => {
    window._paq = []
  });

  it("article Is Useful", () => {
  	Feedback.articleIsUseful("goodArticleName")
    expect(window._paq).toEqual([['trackEvent', "article-feedback-rating", "rating", "goodArticleName", 1]])
  })

  it("article Is Not Useful", () => {
  	Feedback.articleIsNotUseful("badArticleName", "poor spelling")
    expect(window._paq).toEqual([
      ['trackEvent', "article-feedback-review", "REVIEW: badArticleName", "poor spelling", ""],
      ['trackEvent', "article-feedback-rating", "rating", "badArticleName", -1]
    ])
  })

  it("custom event", () => {
    Feedback.feedbackEvent("custom", "freeform", "key", "value")
    expect(window._paq).toEqual([['trackEvent', "custom", "freeform", "key", "value"]])
  })

  it("custom event defaults", () => {
    Feedback.feedbackEvent("custom", "basic")
    expect(window._paq).toEqual([['trackEvent', "custom", "basic", "", ""]])
  })
})