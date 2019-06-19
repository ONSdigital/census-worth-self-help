import React from "react"
import renderer from "react-test-renderer"

import StandardDirectory from "../standard-directory"

import {articleList} from "../../utils/testdata"

describe("StandardArticle", () => {
  const pageContext = {
  	breadcrumbs : [ {title: "root", link: "explore"} ],
    peers : [],
    description : "test description",
  	children : articleList.edges,
  	title : "test Directory 1"
  }

  it("renders correctly", () => {
    const tree = renderer
      .create(<StandardDirectory pageContext={pageContext} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})