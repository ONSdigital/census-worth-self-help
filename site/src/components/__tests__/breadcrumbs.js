import React from "react"
import renderer from "react-test-renderer"

import Breadcrumbs from "../breadcrumbs"

describe("Breadcrumbs", () => {
  it("renders correctly", () => {

  	let breadcrumbs = [{title:'root', link:'root'}, {title:'parent', link:'parent'}]
  	let peers = [{title:'peer1', link:'peer1'}, {title:'peer2', link:'peer2'}, {title:'self', link:'self'}]

    const tree = renderer
      .create(<Breadcrumbs breadcrumbs={breadcrumbs} peers={peers}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})