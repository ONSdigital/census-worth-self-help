import Feedback from "../feedback"

describe("Feedback", () => {
  beforeEach(() => {
    window._paq = []
  });

  it("article was bookmarked", () => {
    Feedback.articleWasBookmarked("goodArticleName")
    expect(window._paq).toEqual([['trackEvent', "article-was-bookmarked", "bookmarked", "goodArticleName", 1]])
  })

  it("article was unbookmarked", () => {
    Feedback.articleWasUnBookmarked("goodArticleName")
    expect(window._paq).toEqual([['trackEvent', "article-was-bookmarked", "unbookmarked", "goodArticleName", 1]])
  })

  it("bookmarked was clicked", () => {
    Feedback.bookmarkClickEvent("goodArticleName")
    expect(window._paq).toEqual([['trackEvent', "click-event", "bookmark", "goodArticleName", ""]])
  })

  it("article Is Useful", () => {
  	Feedback.articleIsUseful("goodArticleName", "feedback")
    expect(window._paq).toEqual([
      ['trackEvent', "article-feedback-review", "POSITIVE REVIEW: goodArticleName", "feedback", ""],
      ['trackEvent', "article-feedback-rating", "rating", "goodArticleName", 1]
    ])
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