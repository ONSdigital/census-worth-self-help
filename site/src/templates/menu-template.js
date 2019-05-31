import React from "react"
import MenuLink from "../components/menulink"
import RepoMenu from "../components/repomenu"
import Topbar from "../components/topbar"
import { spacing, colors } from "../utils/styles"

import { css } from "@emotion/core"

export default ({ pageContext }) => {
  return (
    <div>
      <Topbar open={true} />
      <div
        css={css`
          min-height: 100vh;
          ${spacing.main_box};
          background: ${colors.purple};
        `}
      >
        <MenuLink link="/" title="Home" />
        <RepoMenu menutree={pageContext.menutree} />
        <hr
          css={css`
            border-top: 2px solid white;
          `}
        />
        <MenuLink link="/recent" title="Recently updated" img="recent" />
        <MenuLink link="/fsscc" title="Field Contact Centre" img="fcc" />
        <MenuLink link="/settings" title="Settings" img="settings" />
      </div>
    </div>
  )
}
