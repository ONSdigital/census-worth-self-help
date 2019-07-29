import React from "react"
import DetectOffline from "../components/detectoffline"

export default class WebChatManager extends React.Component {
  containerId = process.env.GATSBY_CHAT_BUTTON_CONTAINER_ID
  constructor(props) {
    super(props)
    if (typeof window !== "undefined") {
      window.__8x8Chat = {
        uuid: process.env.GATSBY_CHAT_UUID,
        tenant: process.env.GATSBY_CHAT_TENANT,
        channel: process.env.GATSBY_CHAT_CHANNEL,
        domain: "https://" + process.env.GATSBY_CHAT_DOMAIN,
        path: "/.",
        buttonContainerId: this.containerId,
        align: "right"
      }
      ;(function() {
        var se = document.createElement("script")
        se.type = "text/javascript"
        se.async = true
        se.src =
          window.__8x8Chat.domain +
          window.__8x8Chat.path +
          "/CHAT/common/js/chat.js"

        var os = document.getElementsByTagName("script")[0]
        if (os) {
          os.parentNode.insertBefore(se, os)
        }
      })()
    }
  }

  render() {
    return (
      <DetectOffline showWhen="online" justHide={true}>
          <div
            className="webchat-link"
            data-testid="webchat-link"
          >
            <div id={this.containerId} />
          </div>
      </DetectOffline>
    )
  }
}
