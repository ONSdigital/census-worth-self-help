import React from "react"
import { Detector } from "react-detect-offline"

export default class WebChatManager extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window !== "undefined") {
      window.__8x8Chat = {
        uuid: "script_14559760615d036440b0f923.70558301",
        tenant: "b2ZmaWNlZm9ybmF0aW9uYWwwMQ",
        channel: "FSSCC Chat",
        domain: "https://vcc-eu7.8x8.com",
        path: "/.",
        buttonContainerId:
          "__8x8-chat-button-container-script_14559760615d036440b0f923.70558301",
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
            <div id="__8x8-chat-button-container-script_14559760615d036440b0f923.70558301" />
          </div>
        )}
      />
    )
  }
}
