import React from "react"

export default ({ title, content }) => {
  return (
    <div data-testid="alert-message" style={{"backgroundColor": "lightgreen"}}>
      <b>{title}</b>:&nbsp;<span>{content}</span>
    </div>
  )
}
