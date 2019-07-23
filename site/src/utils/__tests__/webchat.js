import WebChat from "../webchat"
import React from "react"
import renderer from "react-test-renderer"
import { render } from "react-testing-library"

describe("div rendering", () => {
  beforeEach(() => {
    process.env.GATSBY_CHAT_BUTTON_CONTAINER_ID = "chat-button-container"
  });

  it("renders normally when online", () => {
    const tree = renderer.create(<WebChat />).toJSON()
    expect(tree).toMatchSnapshot()

    const { getByTestId } = render(<WebChat />)
    expect(getByTestId("webchat-link")).not.toHaveStyle("display:none")
  })

  it("is not displayed when offline", () => {
  	Object.defineProperty(navigator, "onLine", {
      configurable: true,
      value: false
    });

    const { getByTestId } = render(<WebChat />)
    expect(getByTestId("webchat-link")).toHaveStyle("display:none")
  })
})