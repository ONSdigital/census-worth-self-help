import React from "react"
import { css } from "@emotion/core"

import Topbar from "./topbar"
import Footer from "./footer"
import Section from "./section"
import Alert from "../components/alert"
import { spacing } from "../utils/styles"

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
      <Topbar searchObject={searchObject} logo={logo} />
      <div
        css={css`
          overflow: scroll;
          width: 100vw;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          align-items: center;
        `}
      >
        <main
          css={css`
            flex-grow: 1;
            width: 100%;
            max-width: ${spacing.desktop_max_width};
          `}
        >
          {alertText && <Alert title={alertTitle} content={alertText} />}
          {explore_more_link && (
            <Section>
              <LargeButton
                icon={<FontAwesomeIcon icon={faBook} />}
                title="Explore Content"
                link="/menu/"
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
