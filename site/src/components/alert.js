import React from "react"

export default ({ title, content }) => {
  return (
    <div style={{"background-color": "lightgreen"}}>
      <b>{title}</b>:&nbsp;<span>{content}</span>
    </div>
  )
}
