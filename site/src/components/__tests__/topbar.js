import React from "react"
import renderer from "react-test-renderer"

import TopBar from "../topbar"
import { render, fireEvent } from "react-testing-library"

import { navigate } from "@reach/router"
import { siteStyle } from "../../utils/styles"
jest.mock("@reach/router", () => ({
  navigate: jest.fn()
}))


describe("TopBar", () => {
  process.env.GATSBY_SITE_BANNER_COLOUR = "rgb(144, 32, 130)"
  
  let updateFunction = jest.fn()

  const searchObject = {
    updateFunction: updateFunction,
    query: "searchString"
  }

  it("renders correctly", () => {
    const tree = renderer.create(<TopBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with searchbox", () => {
    const tree = renderer
      .create(<TopBar searchObject={searchObject} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has working search box", () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <TopBar searchObject={searchObject} />
    )

    const searchBox = getByTestId("search-box")

    expect(searchBox.value).toEqual("searchString")

    fireEvent.change(searchBox, { target: { value: "TEST VALUE" } })

    expect(updateFunction).toHaveBeenCalled()
  })

  it("menu links return to original page", () => {
    // create a fake window object with the pathname parameter and the redirect parameter.
    global.window = Object.create(window)
    Object.defineProperty(window, "location", {
      value: {
        pathname: "testtest",
        search: "?redirect=" + encodeURIComponent("/testtest/")
      }
    })

    // if you are on page testtest and click menu:
    let { getByText } = render(<TopBar />)

    const menuButton = getByText("Menu")
    fireEvent.click(menuButton)

    // you get sent to the menu page with redirect link in the url
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith("/menu/?redirect=testtest")

    // if you have the redirect link in the url and click close
    getByText = render(<TopBar backButton={true} />).getByText

    const closeButton = getByText("Close")
    fireEvent.click(closeButton)

    // you return to the original page
    expect(navigate).toHaveBeenCalledTimes(2)
    expect(navigate).toHaveBeenCalledWith("/testtest/")
  })
})

it("returns default color for sites outside of our knowledge", () => {
  let returnedSiteStyle = siteStyle("/")
  let expectedSiteStyle = "rgb(144, 32, 130)"

  expect(returnedSiteStyle).toEqual(expectedSiteStyle)

  returnedSiteStyle = siteStyle("google.com")
  expect(returnedSiteStyle).toEqual(expectedSiteStyle)
})

it("returns correct site color for specified sites", () => {
  let returnedSiteStyle = siteStyle("/")
  let expectedSiteStyle = "rgb(60, 56, 142)"

  returnedSiteStyle = siteStyle("https://dev.random-domain.com/")
  expect(returnedSiteStyle).toEqual(expectedSiteStyle)

  returnedSiteStyle = siteStyle("https://test.random-domain.com/")
  expectedSiteStyle = "rgb(0, 163, 166)"
  expect(returnedSiteStyle).toEqual(expectedSiteStyle)
})
