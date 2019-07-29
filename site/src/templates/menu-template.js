import React from "react"
import MenuLink from "../components/menulink"
import Topbar from "../components/topbar"
import { spacing, gradients } from "../utils/styles"
import Metadata from "../components/metadata"
import VisuallyHidden from "@reach/visually-hidden"
import DetectOffline from "../components/detectoffline"

import { css } from "@emotion/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faClock,
  faBookmark,
  faPhone
} from "@fortawesome/free-solid-svg-icons"

export default ({ pageContext }) => {
  let menuLinks = pageContext.menutree.map(menu_node => (
    <MenuLink
      key={menu_node.title}
      link={menu_node.link + "/"}
      title={menu_node.title}
      hidden_nodes={menu_node.children}
    />
  ))

  return (
    <div>
      <Metadata>Self Help Facility - Menu</Metadata>
      <Topbar backButton={true} />
      <VisuallyHidden>
        <h1>Menu</h1>
      </VisuallyHidden>
      <div
        css={css`
          width: 100vw;
          min-height: 100vh;
          ${gradients.navy_shine};
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
        data-testid="menu-template-menu-box-overlay"
      >
        <div
          css={css`
            width: 100%;
            max-width: ${spacing.desktop_max_width};
          `}
        >
          <MenuLink
            link=""
            title="Home"
            icon={<FontAwesomeIcon icon={faHome} />}
          />
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
          <DetectOffline showWhen="offline"><MenuLink
            link="mostrecent/"
            title="Recently updated"
            icon={<FontAwesomeIcon icon={faClock} />}
          /></DetectOffline>
          <DetectOffline showWhen="online"><MenuLink
            link="mostrecent"
            title="Recently updated"
            icon={<FontAwesomeIcon icon={faClock} />}
          /></DetectOffline>
          <MenuLink
            link="bookmarks/"
            title="My Bookmarks"
            icon={<FontAwesomeIcon icon={faBookmark} />}
          />
          <MenuLink
            link="contactcentre/"
            title="Census Field Support"
            icon={<FontAwesomeIcon icon={faPhone} />}
          />
        </div>
      </div>
    </div>
  )
}
