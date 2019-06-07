import React from "react"
import renderer from "react-test-renderer"
import MostRecent from "../mostrecent"
import { render } from "react-testing-library"
import { articleList } from "../../utils/testdata"

describe("Most Recent", () => {
  it("renders correctly", () => {
    const mostRecentData = { allMarkdownRemark : articleList }
    const tree = renderer.create(<MostRecent data={mostRecentData}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})