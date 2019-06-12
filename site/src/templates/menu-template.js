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
          ${gradients.navy_shine};
        `}
        data-test="menu-template__menu-box-overlay"
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
        <MenuLink link="/mostrecent" title="Recently updated" />
        {/* todo: <MenuLink link="/bookmarks" title="My Bookmarks" /> */}
        {/* todo: <MenuLink link="/fsscc" title="Field Contact Centre" /> */}
      </div>
    </div>
  )
}
