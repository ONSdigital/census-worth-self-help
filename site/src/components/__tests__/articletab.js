import React from "react"
import renderer from "react-test-renderer"

import ArticleTab from "../articletab"

import {articleNode} from "../../utils/testdata"

describe("ArticleTab", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ArticleTab node={articleNode} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})