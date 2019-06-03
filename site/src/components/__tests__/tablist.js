import React from "react"
import renderer from "react-test-renderer"

import TabList from "../tablist"

describe("TabList", () => {
  
  const tabs = [
  	{title:"tab1", link:"tab1", type:"article"},
	{title:"tab2", link:"tab2", type:"directory"},
	{title:"tab3", link:"tab3", type:"article"},
	{title:"tab4", link:"tab4", type:"directory"},
  ]

  it("renders correctly", () => {
    const tree = renderer
      .create(<TabList elements={tabs} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})