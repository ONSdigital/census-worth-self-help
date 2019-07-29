import React from "react"

const inBrowser = typeof navigator !== "undefined";

export default class DetectOffline extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.showWhenOffline = this.props.showWhen === 'offline'
    this.hideRatherThanRemove = this.props.justHide
 	this.state = {
      online:
        inBrowser && typeof navigator.onLine === "boolean"
          ? navigator.onLine
          : true
    };
   
    this.goOnline = this.goOnline.bind(this);
    this.goOffline = this.goOffline.bind(this);
  }

  componentDidMount() {
    window.addEventListener("online", this.goOnline);
    window.addEventListener("offline", this.goOffline);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.goOnline);
    window.removeEventListener("offline", this.goOffline);
  }

  goOnline() {
  	this.setState({online : true})
  }

  goOffline() {
  	this.setState({online : false})
  }

  render() {
  	let renderInvisible = false
  	if(this.state.online === this.showWhenOffline) {
  		if(this.hideRatherThanRemove) {
  			renderInvisible = true
  		}
  		else
  		{
  			return (null);
  		}
  	}

    let {children} = this.props

    return (
   		<div data-testid="offlinable-container" style={{ display: renderInvisible ? "none" : "" }}>{children}</div>
    )
  }
}