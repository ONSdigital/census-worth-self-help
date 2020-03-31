import React from "react"
import { css } from "@emotion/core"
import { spacing, colors } from "../utils/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { getSiteSpecificStyle } from "../utils/contenttransforms"

export default class Notification extends React.Component {
  constructor(props) {
    super(props)
    // Always enter hidden and timed out.
    this.hidden = false
    this.timedOut = true

    this.hide = this.hide.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.cancelTimer = this.cancelTimer.bind(this)
    this.timer = undefined
  }

  hide() {
    if (!this.hidden && !this.timedOut) {
      this.cancelTimer()
      this.timedOut = true
      this.forceUpdate()
    }
  }

  cancelTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  startTimer() {
    this.cancelTimer()
    this.timer = setTimeout(this.hide, 3000)
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { text, notificationId = 0, hidden = true } = this.props
    // we can retrigger notification when it is hidden then unhidden or the id is changed.
    if (
      hidden !== nextProps.hidden ||
      notificationId !== nextProps.notificationId
    ) {
      this.cancelTimer()
      this.timedOut = false
      if (text !== nextProps.text && !nextProps.hidden) {
        this.startTimer()
      }
    }
    return true
  }

  componentWillUnmount() {
    this.cancelTimer()
  }

  render() {
    let { text, icon, hidden = true } = this.props
    let height = "78px"

    let newHiddenState = hidden || this.timedOut
    // if we've changed from hidden to not hidden, start timer.
    if (this.hidden && !newHiddenState) {
      this.startTimer()
    }

    this.hidden = newHiddenState
    if (this.hidden) {
      this.cancelTimer()
    }
    const siteSpecificColourClass = getSiteSpecificStyle().siteSpecificColourClass
    return (
      <div
        css={css`
          position: fixed;
          height: ${height};
          width: 100vw;
          bottom: ${this.hidden ? "-" + height : "0px"};
          transition: bottom 0.5s;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            border-top: solid 1px ${colors.golden_yellow};
            background-color: ${colors.light_tan};
          `}
        >
          <div
            css={css`
              flex-grow: 1;
              ${spacing.vert_aligned_flex_text};
              align-items: center;
            `}
          >
            <div
              className={`Article-Title-Style ${siteSpecificColourClass}`}
              css={css`
                display: flex;
                align-items: center;
                color: ${colors.black_two};
                padding: 5px;
              `}
            >
              {icon}
              <div
                className="Article-sub-title-Style"
                css={css`
                  padding-left: 15px;
                `}
                data-testid="notification-text-content"
              >
                {text}
              </div>
            </div>
          </div>

          <div
            data-testid="notification-close-button"
            className="Article-sub-title-Style clickable"
            onClick={this.hide}
          >
            <FontAwesomeIcon
              css={css`
                margin: 10px;
                color: #6e6e6e;
              `}
              icon={faTimes}
            />
          </div>
        </div>
      </div>
    )
  }
}
