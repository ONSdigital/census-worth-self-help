import React from "react"
import renderer from "react-test-renderer"
import BlockButton from "../blockbutton"
import { render, fireEvent } from "react-testing-library"

describe("BlockButton", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<BlockButton title="title" subtitle="anything" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("can be clicked", () => {
  	let clickFunction = jest.fn()

  	const { getByTestId } = render(<BlockButton title="title" subtitle="anything" clickFunction={clickFunction}/>);

  	fireEvent.click(getByTestId('block-button'));

    expect(clickFunction).toHaveBeenCalled();
  });
})