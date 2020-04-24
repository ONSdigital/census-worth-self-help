import React from "react"
import renderer from "react-test-renderer"
import PaginationBar from "../paginationbar"
import { PaginationObject } from "../../utils/pagination"
import { render } from "react-testing-library"

describe("PaginationBar", () => {
  const paginator = new PaginationObject()

  it("renders correctly", () => {
    const tree = renderer
      .create(<PaginationBar
            total={10}
            paginator={paginator}
            clickFunction={ () => {} }
            onPageCount={5}
          />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  /* For pages at beginning / middle / end, check that we:
      correctly list the number of elements showing
      have correct back / forward buttons showing
      have correct page numbers showing.
  */
  it("navigation on page 0", () => {
  	paginator.goToPage(0)

	const { getByTestId, queryByTestId } = render(<PaginationBar
            total={88}
            paginator={paginator}
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
  	paginator.goToPage(6)

	const { getByTestId, queryByTestId } = render(<PaginationBar
            total={88}
            paginator={paginator}
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
  	paginator.goToPage(17)

	const { getByTestId, queryByTestId } = render(<PaginationBar
            total={88}
            paginator={paginator}
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