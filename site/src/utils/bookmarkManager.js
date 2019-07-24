import Feedback from "./feedback"

export default class BookmarkManager {
  constructor() {
    try {
      this.localStorage = localStorage
      this.bookmarks = JSON.parse(this.localStorage.getItem("bookmarks"))
    } catch (exception) {
      this.localStorage = false
    }

    if (!this.bookmarks) {
      this.bookmarks = []
    }
  }

  getTopBookmarks() {
    return this.bookmarks
  }

  isPageBookmarked(page) {
    return this.bookmarks.includes(page)
  }

  bookmarkPage(page) {
    if (!this.isPageBookmarked(page)) {
      this.bookmarks.push(page)
    }
    this.localStorage &&
      this.localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks))
  }

  unBookmarkPage(page) {
    this.bookmarks = this.bookmarks.filter(function(bookmark) {
      return bookmark !== page
    })

    this.localStorage &&
      this.localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks))
  }

  addBookmarkClickEventToEdges(edges) {
    edges.forEach(
      edge => (edge.node.clickFunction = Feedback.bookmarkClickEvent)
    )
  }
}
