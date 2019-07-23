import React from "react"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { spacing } from "../utils/styles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

export default class MenuLink extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.hidden_nodes = props.hidden_nodes ? props.hidden_nodes : []
    this.state = { toggled: false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  render() {
    let { icon, title, link, depth = 0 } = this.props

    let hiddenMenu = null
    if (this.hidden_nodes.length !== 0) {
      hiddenMenu = this.hidden_nodes.map(node => (
        <MenuLink
          key={node.title}
          title={node.title}
          link={node.link}
          hidden_nodes={node.children}
          depth={depth + 1}
        />
      ))
    }

    let indent = depth * 10 + 20 + "px"

    return (
      <div data-testid="menulink">
        <div
          css={css`
            ${spacing.standard_vertical};
            display: flex;
            padding-left: ${indent};
            padding-right: 20px;
          `}
        >
          <div
            onClick={() => navigate("/" + link)}
            className="Menu-major-item-Style clickable"
            css={css`
              flex-grow: 1;
              display: flex;
            `}
          >
            {icon && (
              <div
                css={css`
                  padding-right: 15px;
                `}
              >
                {icon}
              </div>
            )}
            {title}
          </div>
          {hiddenMenu && (
            <div
              className="Menu-major-item-Style clickable"
              data-testid="toggle-button"
              onClick={this.toggle}
              css={css`
                padding: 0px 30px;
              `}
            >
              {!this.state.toggled && (
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              )}
              {this.state.toggled && (
                <span>
                  <FontAwesomeIcon icon={faMinus} />
                </span>
              )}
            </div>
          )}
        </div>
        {hiddenMenu && this.state.toggled && (
          <div
            data-testid="child-container"
            css={css`
              background-color: rgba(255, 255, 255, 0.1);
            `}
          >
            {hiddenMenu}
          </div>
        )}
      </div>
    )
  }
}
