import React from "react"
import renderer from "react-test-renderer"

import StandardArticle from "../standard-article"

import {articleNode, articleList} from "../../utils/testdata"
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
    expect(window._paq).toEqual([['trackEvent', "article-feedback", "positive", "test Article 1", ""]])

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
    expect(window._paq).toEqual([['trackEvent', "article-feedback", "negative", "test Article 1", 'TEST VALUE']])
  })
})