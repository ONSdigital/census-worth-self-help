import React from "react"
import MenuLink from "../components/menulink"
import Topbar from "../components/topbar"
import { spacing, gradients } from "../utils/styles"

import { css } from "@emotion/core"

export default ({ pageContext }) => {
  let menuLinks = pageContext.menutree.map(menu_node => (
    <MenuLink
      key={menu_node.title}
      link={menu_node.link}
      title={menu_node.title}
      hidden_nodes={menu_node.children}
    />
  ))

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
        {menuLinks}
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
