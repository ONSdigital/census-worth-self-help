import React from "react"
import renderer from "react-test-renderer"
import Bookmarks from "../bookmarks"
import { render } from "react-testing-library"
import { articleList } from "../../utils/testdata"
import BookmarkManager from "../../utils/bookmarkManager"

jest.mock('../../utils/bookmarkManager', () => jest.fn());

// default to no bookmarks
BookmarkManager.mockImplementation(
  () => ({
    getTopBookmarks: () => [],
    addBookmarkClickEventToEdges: (edges) => {} 
  })
)

describe("Bookmarks", () => {
  const data = { allMarkdownRemark : articleList }

  it("renders correctly without bookmarks", () => {
    const tree = renderer.create(<Bookmarks data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with bookmarks", () => {

    BookmarkManager.mockImplementation(
      () => ({
        getTopBookmarks: () => ["test Article 1", "bogus article"],
        addBookmarkClickEventToEdges: (edges) => {} 
      })
    )

    const tree = renderer.create(<Bookmarks data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})