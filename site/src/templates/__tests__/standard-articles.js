import React from "react"
import renderer from "react-test-renderer"

import StandardArticle from "../standard-article"

import {articleNode, articleList} from "../../utils/testdata"

describe("StandardArticle", () => {
  const pageContext = {
  	breadcrumbs : [],
  	peers : [ {title: "nothing"}, {title: "test Article 2"}],
  	title : "test Article 1"
  }
  const data = {
  	markdownRemark : articleNode,
    allMarkdownRemark : articleList
  }
  it("renders correctly", () => {
    const tree = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})