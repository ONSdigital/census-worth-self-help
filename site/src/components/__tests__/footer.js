import React from "react"
import renderer from "react-test-renderer"
import { render, fireEvent } from "react-testing-library"

import Footer from "../footer"

import { navigate } from "@reach/router"

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}))

describe("Footer", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Footer/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("test support page click has analytic event", () => {
  	window._paq = []

  	const { getByText } = render(<Footer phone_link={true}/>);
  	// Census Field Support
  	fireEvent.click(getByText('Census Field Support'));

  	expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/contactcentre/')

  	expect(window._paq[0]).toEqual([
      "trackEvent",
      "census-field-support",
      "clicked help",
      "page",
      "/"
    ])
  })
})