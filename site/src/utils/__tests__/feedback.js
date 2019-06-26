import Feedback from "../feedback"

describe("Feedback", () => {
  beforeEach(() => {
    window._paq = []
  });

  it("article Is Useful", () => {
  	Feedback.articleIsUseful("goodArticleName")
    expect(window._paq).toEqual([['trackEvent', "article-feedback", "positive", "goodArticleName", ""]])
  })

  it("article Is Not Useful", () => {
  	Feedback.articleIsNotUseful("badArticleName", "poor spelling")
    expect(window._paq).toEqual([['trackEvent', "article-feedback", "negative", "badArticleName", "poor spelling"]])
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