import React from "react"
import renderer from "react-test-renderer"
import Index from "../index"
import { render } from "react-testing-library"

describe("Index", () => {
  it("renders correctly without data and has no alert", () => {
    // check snapshot
    const empty_data = {}
    const tree = renderer.create(<Index data={empty_data}/>).toJSON()
    expect(tree).toMatchSnapshot()

    // check no alert
    const { queryByTestId } = render(<Index data={empty_data}/>)
    expect(queryByTestId('alert-message')).toBeNull()
  })

  it("renders correctly with alert data and has alert", () => {
    // check snapshot
    const alert_data = { markdownRemark : { frontmatter: {alert_content: "this is test content"}}}
    const tree = renderer.create(<Index data={alert_data}/>).toJSON()
    expect(tree).toMatchSnapshot()
    
    // check alert content
    const { getByTestId } = render(<Index data={alert_data}/>)
    expect(getByTestId("alert-message")).toHaveTextContent("Alert: this is test content")
  })
})