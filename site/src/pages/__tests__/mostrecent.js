import React from "react"
import renderer from "react-test-renderer"
import MostRecent from "../mostrecent"
import { render } from "react-testing-library"
import { articleList } from "../../utils/testdata"


describe("Most Recent", () => {
  process.env.GATSBY_SITE_BANNER_COLOUR = "rgb(144, 32, 130)"
  
  it("renders correctly", () => {
    const mostRecentData = { allMarkdownRemark: articleList }
    const tree = renderer.create(<MostRecent data={mostRecentData} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
