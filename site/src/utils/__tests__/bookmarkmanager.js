import { BookmarkManager } from "../bookmarkManager"

describe("Bookmark Manager", () => {
  it("adding bookmarks", () => {
    let bookmarkManager = new BookmarkManager()

    bookmarkManager.bookmarkPage("a")
    bookmarkManager.bookmarkPage("b")
    bookmarkManager.bookmarkPage("c")
    expect(bookmarkManager.getTopBookmarks()).toEqual(["a", "b", "c"])
  })

  it("removing bookmarks", () => {
    let bookmarkManager = new BookmarkManager()

    bookmarkManager.bookmarkPage("a")
    bookmarkManager.bookmarkPage("b")
    bookmarkManager.bookmarkPage("c")

    bookmarkManager.unBookmarkPage("b")
    bookmarkManager.unBookmarkPage("c")

    // remove element that doesn't exist
    bookmarkManager.unBookmarkPage("d")

    expect(bookmarkManager.getTopBookmarks()).toEqual(["a"])
  })

  it("check if page is bookmarked", () => {
    let bookmarkManager = new BookmarkManager()

    bookmarkManager.bookmarkPage("a")
    bookmarkManager.bookmarkPage("b")
    bookmarkManager.bookmarkPage("c")

    expect(bookmarkManager.isPageBookmarked("a")).toEqual(true)
    expect(bookmarkManager.isPageBookmarked("d")).toEqual(false)
  })
})