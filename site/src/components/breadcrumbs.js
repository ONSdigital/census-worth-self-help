import React from "react"
import { css } from "@emotion/core"
import { colors } from "../utils/styles"

export default ({ breadcrumbs, peers }) => {
  console.log(breadcrumbs)
  let breadcrumbOptions = breadcrumbs.map(( breadcrumb ) => (
    <option key={breadcrumb.title} value={breadcrumb.link}>{breadcrumb.title}</option>
  ))
  let peerOptions = peers.map(( peer ) => (
    <option key={peer.title} value={peer.link}>{peer.title}</option>
  ))

  return (
    <div css={css`
	  	 color: ${colors.purple};
  	 `}>
  	 EXPLORE CONTENT
	  	<div>
		  	<select>
		  	 	{breadcrumbOptions}
		  	 	{peerOptions}
		  	</select>
	  	</div>
    </div>
  )
}
