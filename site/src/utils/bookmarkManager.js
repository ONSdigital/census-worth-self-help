export default class BookmarkManager {
  constructor() {
    this.bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    if (this.bookmarks === null) {
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
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks))
  }

  unBookmarkPage(page) {
    this.bookmarks = this.bookmarks.filter(function(bookmark) {
      return bookmark !== page
    })

    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks))
  }
}
