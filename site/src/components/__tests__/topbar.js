import React from "react"
import renderer from "react-test-renderer"

import TopBar from "../topbar"
import { render, fireEvent } from "react-testing-library"

describe("TopBar", () => {

  let updateFunction = jest.fn()

  const searchObject = {
    updateFunction: updateFunction,
    query: "searchString"
  }

  it("renders correctly", () => {
    const tree = renderer
      .create(<TopBar/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with searchbox", () => {
    const tree = renderer
      .create(<TopBar searchObject={searchObject} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has working search box", () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(<TopBar searchObject={searchObject} />);
  	
    const searchBox = getByTestId('search-box')

  	expect(searchBox.value).toEqual("searchString")

  	fireEvent.change(searchBox, { target: { value: 'TEST VALUE' } });

  	expect(updateFunction).toHaveBeenCalled();
  })
})