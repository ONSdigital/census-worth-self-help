import React from "react"
import renderer from "react-test-renderer"

import StandardArticle from "../standard-article"

import {articleNode} from "../../utils/testdata"

describe("StandardArticle", () => {
  const pageContext = {
  	breadcrumbs : [],
  	peers : [],
  	title : "test Article 1"
  }
  const data = {
  	markdownRemark : articleNode
  }
  it("renders correctly", () => {
    const tree = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})