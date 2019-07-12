import React from "react"
import { css } from "@emotion/core"

import Topbar from "./topbar"
import Footer from "./footer"
import { spacing } from "../utils/styles"
import OnsLogo from "./onslogo"
import Section from "./section"
import Alert from "../components/alert"

import LargeButton from "../components/largebutton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from "@fortawesome/free-solid-svg-icons"

export default ({
  children,
  logo = false,
  phone_link = false,
  explore_more_link = false,
  alertText = false,
  alertTitle = "Alert",
  searchObject
}) => {
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      <Topbar searchObject={searchObject} />
      {logo && <OnsLogo />}
      <div
        css={css`
          ${spacing.main_box}
          overflow: scroll;
          width: 100vw;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        `}
      >
        <main
          css={css`
            flex-grow: 1;
          `}
        >
          {alertText && <Alert title={alertTitle} content={alertText} />}
          {explore_more_link && (
            <Section>
              <LargeButton
                icon={<FontAwesomeIcon icon={faBook} />}
                title="Explore Content"
                link="/menu"
              />
            </Section>
          )}
          {children}
        </main>
        <Footer phone_link={phone_link} />
      </div>
    </div>
  )
}
