import React from "react"
import { css } from "@emotion/core"
import { spacing } from "../utils/styles"


const PaginationIcon = ( { children, clickFunction, pageTarget, underlined=false} ) => {
  return (
    <div className="Article-Title-Style" css={css`
        padding: 0px 5px;
        text-decoration: ${underlined ? "underline" : "none"};
      `}
      onClick={() => clickFunction(pageTarget)} >
        {children}
    </div>
  )
}

export default ({ paginationObject, total, onPageCount, clickFunction }) => {

  let range = (start, end) => {
    return Array((end+1) - start).fill(start).map((x, y) => x + y)
  }

  paginationObject.capOffset(total)
  let page = paginationObject.page
  let lastPage = Math.ceil( total / paginationObject.perPage) - 1

  let pageOptionSpread = 1 // the number of page options before or after this page to show

  let firstPageOption = page - pageOptionSpread
  if (firstPageOption < 0) {firstPageOption = 0}
 
  let lastPageOption = page + pageOptionSpread
  if (lastPageOption > lastPage) {lastPageOption = lastPage}
 
  let pageOptions = range(firstPageOption, lastPageOption)
  let pageOptionsLinks = pageOptions.map( pageOption => (
    <PaginationIcon key={pageOption} clickFunction={clickFunction} pageTarget={pageOption} 
      underlined={pageOption === page }>{pageOption+1}</PaginationIcon>
  ))

  return (
    <div css={css`
          padding: 15px 0px;
    `}>
      <div className="Button-subhead-Style" css={css`
          display: flex;
          ${spacing.in_page_element}
        `}>
        <div css={css`
            flex-grow: 1
        `}>Showing {paginationObject.offset+1}-{paginationObject.offset + onPageCount} of {total}</div>
        <div>Show {paginationObject.perPage} per page</div>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        { page !== 0 && <PaginationIcon clickFunction={clickFunction} pageTarget={0} >&lt;&lt;</PaginationIcon>}
        { page !== 0 && <PaginationIcon clickFunction={clickFunction} pageTarget={page-1} >&lt;</PaginationIcon>}
        { pageOptionsLinks }
        { page !== lastPage && <PaginationIcon clickFunction={clickFunction} pageTarget={page+1}>&gt;</PaginationIcon>}
        { page !== lastPage && <PaginationIcon clickFunction={clickFunction} pageTarget={lastPage}>&gt;&gt;</PaginationIcon>}
      </div>
    </div>
  )
}
