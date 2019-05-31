import React from "react"
import MenuLink from "../components/menulink"
import RepoMenu from "../components/repomenu"
import Topbar from "../components/topbar"
import { spacing, gradients } from "../utils/styles"

import { css } from "@emotion/core"

export default ({ pageContext }) => {
  return (
    <div>
      <Topbar open={true} />
      <div
        css={css`
          min-height: 100vh;
          ${spacing.main_box};
          padding-left: 20px;
          padding-right: 20px;
          ${gradients.purple_shine};
        `}
      >
        <MenuLink link="/" title="Home" />
        <hr
          css={css`
            border-top: 1px solid white;
          `}
        />
        <RepoMenu menutree={pageContext.menutree} />
        <hr
          css={css`
            border-top: 1px solid white;
          `}
        />
        <MenuLink link="/recent" title="Recently updated" />
	    <MenuLink link="/bookmarks" title="My Bookmarks" />
        <MenuLink link="/fsscc" title="Field Contact Centre" />
      </div>
    </div>
  )
}
