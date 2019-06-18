import React from "react"
import renderer from "react-test-renderer"
import { render, fireEvent } from "react-testing-library"

import LargeButton from "../largebutton"

import { navigate } from "@reach/router"

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}))

describe("Large Button", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<LargeButton title="press me" link="/anywhere"/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("navigates when clicked", () => {
  	const { getByTestId } = render(<LargeButton title="press me" link="/anywhere"/>);
  	
    const button = getByTestId('large-button')

  	expect(button.textContent).toEqual("press me")

  	fireEvent.click(button);

  	expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/anywhere')
  })
})