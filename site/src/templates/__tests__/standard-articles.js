import React from "react"
import renderer from "react-test-renderer"

import StandardArticle from "../standard-article"

import {
  articleNode,
  articleList,
  webchatArticleNode
} from "../../utils/testdata"
import { render, fireEvent } from "react-testing-library"

describe("StandardArticle", () => {
  beforeEach(() => {
    window._paq = []
    delete process.env.GATSBY_IS_CC_SITE
  })

  const pageContext = {
    breadcrumbs: [],
    peers: [{ title: "nothing" }, { title: "test Article 2" }],
    title: "test Article 1"
  }
  const data = {
    markdownRemark: articleNode,
    allMarkdownRemark: articleList
  }
  it("renders correctly", () => {
    const tree = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("if markdown not found, we render a suitable message", () => {
    const { getByTestId } = render(
      <StandardArticle
        data={{ markdownRemark: null, allMarkdownRemark: articleList }}
        pageContext={pageContext}
      />
    )

    const articleContent = getByTestId("article-content")
    expect(articleContent.textContent).toEqual(
      "Article content not found. Please Report."
    )
  })

  it("positive feedback", () => {
    // create page
    const { getByTestId, getByText } = render(
      <StandardArticle data={data} pageContext={pageContext} />
    )

    // click positive feedback
    const positiveButton = getByText("Useful")
    fireEvent.click(positiveButton)

    // check notification text
    const notification = getByTestId("notification-text-content")
    expect(notification.textContent).toEqual("Thank you for your feedback")

    // check paq updated.
    expect(window._paq).toEqual([
      ["setCustomDimension", 1, "article"],
      ["trackEvent", "article-feedback-rating", "rating", "test Article 1", 1],
      ["setCustomDimension", 1, "article"]
    ])
  })

  it("negative feedback", () => {
    // create page
    const { getByTestId, getByText } = render(
      <StandardArticle data={data} pageContext={pageContext} />
    )

    // click negative feedback
    const negativeButton = getByText("Not useful")
    fireEvent.click(negativeButton)

    // check form appears
    const feedbackContent = getByTestId("feedback-content")

    // add text.
    fireEvent.change(feedbackContent, { target: { value: "TEST VALUE" } })

    // click confirm
    const submitButton = getByTestId("feedback-screen-submit-button")
    fireEvent.click(submitButton)

    // check paq updated.
    expect(window._paq).toEqual([
      ["setCustomDimension", 1, "article"],
      ["setCustomDimension", 1, "article"],
      [
        "trackEvent",
        "article-feedback-review",
        "REVIEW: test Article 1",
        "TEST VALUE",
        ""
      ],
      ["trackEvent", "article-feedback-rating", "rating", "test Article 1", -1],
      ["setCustomDimension", 1, "article"]
    ])
  })

  it("webchat is set based on tags", () => {
    // a normal article doesn't have webchat
    const { queryByTestId } = render(
      <StandardArticle data={data} pageContext={pageContext} />
    )
    expect(queryByTestId("webchat-link")).toBeNull()

    //one tagged for webchat does
    const { getByTestId } = render(
      <StandardArticle
        data={{
          markdownRemark: webchatArticleNode,
          allMarkdownRemark: articleList
        }}
        pageContext={pageContext}
      />
    )

    expect(getByTestId("webchat-link")).toBeDefined()
  })

  it("if there are no roles related to the article return empty string", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    expect(articleInstance.concatenateRoles([])).toEqual("")
  })

  it("if there is one role related to the article return it", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    expect(articleInstance.concatenateRoles(["role A"])).toEqual("role A")
  })

  it("if there are multiple roles related to the article return them", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    expect(
      articleInstance.concatenateRoles(["role A", "role B", "role C", "D"])
    ).toEqual("role A, role B, role C, D")
  })

  it("returns an empty string when there are no roles in the page data", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()

    let editedData = { frontmatter: { roles: [] } }

    expect(articleInstance.getRoles(editedData)).toEqual("")
  })

  it("returns an empty string when the roles object doesn't exist", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()

    let editedData = { frontmatter: {} }

    expect(articleInstance.getRoles(editedData)).toEqual("")
  })
  it("can get the roles from the page data when they exist", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()

    const post = data.markdownRemark
    expect(articleInstance.getRoles(post)).toEqual("arole")
  })
  it("hasroles returns true if there are roles", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    const post = data.markdownRemark

    expect(articleInstance.hasRoles(post)).toBeTruthy()
  })
  it("hasroles returns true if there is an empty roles object", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    let post = { frontmatter: { roles: [] } }

    expect(articleInstance.hasRoles(post)).toBeTruthy()
  })
  it("hasroles returns false if the roles object does not exist", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    let post = { frontmatter: {} }

    expect(articleInstance.hasRoles(post)).toBeFalsy()
  })
  it("hasccnote returns true if there is a ccnote and the note is not blank", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    let post = { frontmatter: { cconlynote: "testnote" } }

    expect(articleInstance.hasCCNote(post)).toBeTruthy()
  })
  it("hasccnote returns false if the ccnote object does not exist", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    let post = { frontmatter: {} }

    expect(articleInstance.hasCCNote(post)).toBeFalsy()
  })
  it("hasccnote returns false if the ccnote string is blank", () => {
    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    let post = { frontmatter: { cconlynote: "" } }

    expect(articleInstance.hasCCNote(post)).toBeFalsy()
  })

  it("isCCSite returns true if the environment variable is true", () => {
    process.env.GATSBY_IS_CC_SITE = true

    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    expect(articleInstance.isCCSite()).toBeTruthy()
  })
  it("isCCSite returns false if the environment variable is false", () => {
    process.env.GATSBY_IS_CC_SITE = false

    const articleInstance = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .getInstance()
    expect(articleInstance.isCCSite()).toBeFalsy()
  })
  it("the notes are on the page for a valid cc page", () => {
    process.env.GATSBY_IS_CC_SITE = true
    let modifiedData = data
    data.markdownRemark.frontmatter.cconlynote = "testnote"
    
      const { getByTestId } = render(
        <StandardArticle
          data={modifiedData}
          pageContext={pageContext}
        />
      )
  
      expect(getByTestId("cc-notes")).toBeDefined()

  })

})
