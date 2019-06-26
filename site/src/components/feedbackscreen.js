import React from "react"
import { css } from "@emotion/core"

export default ({ hideFunction, submitFunction }) => {
  return (
    <div
      css={css`
        top: 0;
        position: fixed;
        height: calc(100vh - 41px);
        width: calc(100vw - 40px);
        margin: 29px 20px 12px 20px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        align-items: stretch;
      `}
    >
      <div
        className="Button-subhead-Style"
        css={css`
          width: 100%;
          text-align: center;
          padding: 14px 0px;
          border-bottom: 1px rgba(17, 17, 17, 0.1) solid;
        `}
      >
        Please tell us how we could improve
      </div>
      <div
        css={css`
          flex-grow: 1;
          padding: 20px;
        `}
      >
        <textarea
          data-testid="feedback-content"
          id="feedBackContent"
          className="Confirmation-text-style"
          autoFocus
          placeholder="Start typing..."
          css={css`
            outline: none;
            resize: none;
            height: 100%;
            width: 100%;
            padding: 0px;
            font-weight: 500;
            color: #9b9b9b;
            box-sizing: border-box;
          `}
        />
      </div>
      <div
        className="Button-subhead-Style"
        css={css`
          display: flex;
          border-top: 1px rgba(17, 17, 17, 0.1) solid;
          color: #4a90e2;
          font-size: 20px;
        `}
      >
        <div
          css={css`
            padding: 20px;
            flex-grow: 1;
            text-align: center;
            border-right: 1px rgba(17, 17, 17, 0.1) solid;
          `}
          onClick={hideFunction}
          data-testid="feedback-screen-cancel-button"
        >
          Cancel
        </div>
        <div
          css={css`
            padding: 20px;
            flex-grow: 1;
            text-align: center;
            font-weight: 600;
          `}
          data-testid="feedback-screen-submit-button"
          onClick={submitFunction}
        >
          Submit
        </div>
      </div>
    </div>
  )
}
//<div contenteditable="true" >Start typing...</div>
