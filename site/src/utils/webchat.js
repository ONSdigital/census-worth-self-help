import React from "react"
import { Detector } from "react-detect-offline"

export default class WebChatManager extends React.Component {
  containerId = process.env.GATSBY_ASSETS_PATH;
  constructor(props) {
    super(props)
    if (typeof window !== "undefined") {
      window.__8x8Chat = {
        uuid: process.env.GATSBY_UUID,
        tenant: process.env.GATSBY_TENANT,
        channel: process.env.GATSBY_CHANNEL,
        domain: process.env.GATSBY_DOMAIN,
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
      <Detector
        render={({ online }) => (
          <div
            className="webchat-link"
            data-testid="webchat-link"
            style={{ display: online ? "" : "none" }}
          >
            <div id={containerId} />
          </div>
        )}
      />
    )
  }
}
