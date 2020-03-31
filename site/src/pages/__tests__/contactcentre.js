import React from "react"
import renderer from "react-test-renderer"
import ContactCentre from "../contactcentre"
import { getSuggestedEdges } from "../contactcentre"
import { sanitizePhoneNumber } from "../contactcentre"
import { render } from "react-testing-library"
import { articleList, popularList } from "../../utils/testdata"


describe("Contact centre", () => {
  process.env.GATSBY_SITE_BANNER_COLOUR = "primary"
  
  it("renders correctly without data", () => {
    const data = { allMarkdownRemark: { edges: [] } }
    const tree = renderer.create(<ContactCentre data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with data", () => {
    const data = {
      allMarkdownRemark: articleList,
      markdownRemark: {
        frontmatter: {
          contact_centre_text: "wibble wibble",
          contact_centre_number: "01111 333333"
        }
      }
    }
    const tree = renderer.create(<ContactCentre data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("phone numbers are space escaped", () => {
    expect(sanitizePhoneNumber("0123 456 789")).toEqual("0123456789")
  })

  it("get suggested nodes should find popular nodes", () => {
    expect(getSuggestedEdges(articleList.edges)).toEqual(
      popularList.edges.slice(0, 3)
    )
  })
})
