import React from "react"
import renderer from "react-test-renderer"
import PaginationBar from "../paginationbar"
import { PaginationObject } from "../../utils/pagination"
import { render } from "react-testing-library"

/* PaginationBar Testing
	Match snapshot.
	For pages at beginning / middle / end:
		correct record of elements showing
		correct back / forward buttons showing
		correct page numbers showing.
*/
describe("PaginationBar", () => {
  const paginationObject = new PaginationObject()

  it("renders correctly", () => {
    const tree = renderer
      .create(<PaginationBar
            total={10}
            paginationObject={paginationObject}
            clickFunction={ () => {} }
            onPageCount={5}
          />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("navigation on page 0", () => {
  	paginationObject.goToPage(0)

	const { getByTestId, queryByTestId } = render(<PaginationBar
            total={88}
            paginationObject={paginationObject}
            clickFunction={ () => {} }
            onPageCount={5}
          />)
    expect(getByTestId("pagination-element-showing")).toHaveTextContent("Showing 1-5 of 88")
    expect(queryByTestId('pagination-first-button')).toBeNull()
    expect(queryByTestId('pagination-back-button')).toBeNull()

    expect(queryByTestId('pagination-0-button')).toBeNull()
    expect(getByTestId('pagination-1-button')).toBeDefined()
    expect(getByTestId('pagination-2-button')).toBeDefined()
    expect(queryByTestId('pagination-3-button')).toBeNull()

    expect(getByTestId('pagination-next-button')).toBeDefined()
    expect(getByTestId('pagination-last-button')).toBeDefined()
  })

  it("navigation on middle page", () => {
  	paginationObject.goToPage(6)

	const { getByTestId, queryByTestId } = render(<PaginationBar
            total={88}
            paginationObject={paginationObject}
            clickFunction={ () => {} }
            onPageCount={5}
          />)
    expect(getByTestId("pagination-element-showing")).toHaveTextContent("Showing 31-35 of 88")
    expect(getByTestId('pagination-first-button')).toBeDefined()
    expect(getByTestId('pagination-back-button')).toBeDefined()

    expect(queryByTestId('pagination-5-button')).toBeNull()
    expect(getByTestId('pagination-6-button')).toBeDefined()
    expect(getByTestId('pagination-7-button')).toBeDefined()
	expect(getByTestId('pagination-8-button')).toBeDefined()
    expect(queryByTestId('pagination-9-button')).toBeNull()

    expect(getByTestId('pagination-next-button')).toBeDefined()
    expect(getByTestId('pagination-last-button')).toBeDefined()
  })

  it("navigation on last page", () => {
  	paginationObject.goToPage(17)

	const { getByTestId, queryByTestId } = render(<PaginationBar
            total={88}
            paginationObject={paginationObject}
            clickFunction={ () => {} }
            onPageCount={3}
          />)
    expect(getByTestId("pagination-element-showing")).toHaveTextContent("Showing 86-88 of 88")
    expect(getByTestId('pagination-first-button')).toBeDefined()
    expect(getByTestId('pagination-back-button')).toBeDefined()

    expect(queryByTestId('pagination-16-button')).toBeNull()
    expect(getByTestId('pagination-17-button')).toBeDefined()
    expect(getByTestId('pagination-18-button')).toBeDefined()
    expect(queryByTestId('pagination-19-button')).toBeNull()

    expect(queryByTestId('pagination-next-button')).toBeNull()
    expect(queryByTestId('pagination-last-button')).toBeNull()
  })
})

// create paginationObject with 5 pages
// test page zero has no less than button
//   and shows 0 1
// test page 5 has no forward button
//   and shows 4 5
// test page 3 shows everything
//  and 2 3 4