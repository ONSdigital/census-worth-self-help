import React from "react"
import renderer from "react-test-renderer"
import Index from "../index"
import { render } from "react-testing-library"
import { articleList } from "../../utils/testdata"
import BookmarkManager from "../../utils/bookmarkManager"

jest.mock('../../utils/bookmarkManager', () => jest.fn());

// default to no bookmarks
BookmarkManager.mockImplementation(
  () => ({
    getTopBookmarks: () => []
  })
)

describe("Index", () => {

  const mostRecentData = { allMarkdownRemark : articleList }
  const empty_data = {}

  it("renders correctly without data and has no alert", () => {
    // check snapshot
    const tree = renderer.create(<Index data={empty_data}/>).toJSON()
    expect(tree).toMatchSnapshot()

    // check no alert
    const { queryByTestId } = render(<Index data={empty_data}/>)
    expect(queryByTestId('alert-message')).toBeNull()
  })

  it("renders correctly with alert data and has alert", () => {
    // check snapshot
    const message = "this is test content"
    const alert_data = { markdownRemark : { frontmatter: {alert_content: message }}}
    const tree = renderer.create(<Index data={alert_data}/>).toJSON()
    expect(tree).toMatchSnapshot()
    
    // check alert content
    const { getByTestId } = render(<Index data={alert_data}/>)
    expect(getByTestId("alert-message")).toHaveTextContent(message)
  })

  it("check that it draws top 3 most recent", () => {    
    const { getAllByTestId } = render(<Index data={mostRecentData} />)
    expect(getAllByTestId("articletab-article-card").length).toEqual(3)
  })

  it("check that it can draw bookmarks", () => {

    BookmarkManager.mockImplementation(
      () => ({
        getTopBookmarks: () => ["test Article 1"]
      })
    )

    const { getAllByTestId } = render(<Index data={mostRecentData} />)
    expect(getAllByTestId("articletab-article-card").length).toEqual(4)
  })

  it("should not show offline message when online", () => {

    const { queryByText } = render(<Index data={empty_data}/>)
    expect(queryByText('Currently working offline')).toBeNull()

  })

  it("should show offline message when offline", () => {

    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      value: false
    });

    const { getByText } = render(<Index data={empty_data}/>)
    expect(getByText('Currently working offline')).toBeDefined()
  })
})