import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { fonts, spacing } from "../utils/styles"



export default class MenuLink extends React.Component {
  constructor(props) {
    super(props)
    this.title = props.title
    this.link = props.link
    this.hidden_nodes = props.hidden_nodes ? props.hidden_nodes : []
    this.state = {toggled : false}
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
  	this.setState({
        toggled: !this.state.toggled
    })
  }

  render() {
	  let hiddenMenu = null
	  if (this.hidden_nodes.length !== 0)
	  {
		hiddenMenu = this.hidden_nodes.map(( node ) => (
		    <MenuLink
		      key={node.title}
		      title={node.title}
		      link={node.link}
		      children={node.children}
		    />
		))
	  }

	  return (
	  	<div>
		    <div
		      css={css`
		        ${spacing.standard_vertical};
		        display: flex;
		      `}
		    >
		      <Link
		        to={this.link}
		        css={css`
		          ${fonts.menu_link};
		          flex-grow: 1;
		        `}
		      >
		        {this.title}
		      </Link>
		      { hiddenMenu &&
		       <div 
		         onClick={this.toggle}
		         css={css`
		          padding: 0px 30px;
		        `}>
		        {!this.state.toggled && <span>&gt;</span>}
		        {this.state.toggled && <span>v</span>}
		        </div> 
		   	  }
		    </div>
		    {hiddenMenu && this.state.toggled &&
		     <div>
		        {hiddenMenu}
	         </div>
		   	}
	    </div>
	  )
	}
}
