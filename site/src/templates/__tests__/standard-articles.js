import React from "react"
import renderer from "react-test-renderer"

import StandardArticle from "../standard-article"

import {articleNode, articleList, webchatArticleNode} from "../../utils/testdata"
import { render, fireEvent } from "react-testing-library"

describe("StandardArticle", () => {
  const pageContext = {
  	breadcrumbs : [],
  	peers : [ {title: "nothing"}, {title: "test Article 2"}],
  	title : "test Article 1"
  }
  const data = {
  	markdownRemark : articleNode,
    allMarkdownRemark : articleList
  }
  it("renders correctly", () => {
    const tree = renderer
      .create(<StandardArticle data={data} pageContext={pageContext} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("if markdown not found, we render a suitable message", () => {
    const { getByTestId } = render(<StandardArticle 
        data={{ markdownRemark : null, allMarkdownRemark : articleList }}
        pageContext={pageContext}
      />)
    
    const articleContent = getByTestId("article-content")
    expect(articleContent.textContent).toEqual("Article content not found. Please Report.")
  })

  it("positive feedback", () => {
    window._paq = []

    // create page
    const { getByTestId, getByText } = render(<StandardArticle data={data} pageContext={pageContext} />);
    
    // click positive feedback
    const positiveButton = getByText('Useful')
    fireEvent.click(positiveButton);

    // check notification text
    const notification = getByTestId("notification-text-content")
    expect(notification.textContent).toEqual("Thank you for your feedback")

    // check paq updated.
    expect(window._paq).toEqual([['trackEvent', "article-feedback-rating", "rating", "test Article 1", 1]])

  })

  it("negative feedback", () => {
    window._paq = []

    // create page
    const { getByTestId, getByText } = render(<StandardArticle data={data} pageContext={pageContext} />);

    // click negative feedback
    const negativeButton = getByText('Not useful')
    fireEvent.click(negativeButton);

    // check form appears
    const feedbackContent = getByTestId('feedback-content')

    // add text.
    fireEvent.change(feedbackContent, { target: { value: 'TEST VALUE' } });

    // click confirm
    const submitButton = getByTestId('feedback-screen-submit-button')
    fireEvent.click(submitButton);

    // check paq updated.
    expect(window._paq).toEqual([
      ['trackEvent', "article-feedback-review", "REVIEW: test Article 1", "TEST VALUE", ""],
      ['trackEvent', "article-feedback-rating", "rating", "test Article 1", -1]
    ])
  })

  it("webchat is set based on tags", () => {

    // a normal article doesn't have webchat
    const { queryByTestId } = render(<StandardArticle data={data} pageContext={pageContext} />);
    expect(queryByTestId('webchat-link')).toBeNull()

    //one tagged for webchat does
    const { getByTestId } = render(<StandardArticle data={{
      markdownRemark : webchatArticleNode,
      allMarkdownRemark : articleList
    }} pageContext={pageContext} />);

    expect(getByTestId('webchat-link')).toBeDefined()
  })
})