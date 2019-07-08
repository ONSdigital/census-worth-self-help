import React from "react"
import renderer from "react-test-renderer"
import ContactCentre from "../contactcentre"
import { sanitizePhoneNumber } from "../contactcentre"
import { render } from "react-testing-library"
import { articleList } from "../../utils/testdata"

describe("Contact centre", () => {
  it("renders correctly without data", () => {
    const data = {allMarkdownRemark : { edges : []}}
    const tree = renderer.create(<ContactCentre data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with data", () => {
    const data = { allMarkdownRemark : articleList,
    	markdownRemark : { frontmatter: {contact_centre_wait_time: "25", contact_centre_number: "01111 333333" }} }
    const tree = renderer.create(<ContactCentre data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("phone numbers are space escaped", () => {
    expect(sanitizePhoneNumber("0123 456 789")).toEqual("0123456789")
  })
})