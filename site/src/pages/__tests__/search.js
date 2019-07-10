import React from "react"
import renderer from "react-test-renderer"
import Search from "../search"
import { getSuggestedEdges } from "../search"
import { render } from "react-testing-library"
import { articleList, articleNode, popularList } from "../../utils/testdata"
import ReactDOMServer from 'react-dom/server';

describe("Search", () => {
  it("renders correctly", () => {
    const data = { allMarkdownRemark : articleList }
    const tree = renderer.create(<Search data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("bold-pattern function works correctly", () => {
    expect(ReactDOMServer.renderToStaticMarkup(
    	Search.replacePatternToBold("we are bolding test", new RegExp("(test)", 'ig'))
    	)).toEqual("we are bolding <strong>test</strong>")

    expect(ReactDOMServer.renderToStaticMarkup(
    	Search.replacePatternToBold("we are bolding test and best", new RegExp("(test|best)", 'ig'))
    	)).toEqual("we are bolding <strong>test</strong> and <strong>best</strong>")

    expect(ReactDOMServer.renderToStaticMarkup(
    	Search.replacePatternToBold("we are bolding nothing", new RegExp("(something)", 'ig'))
    	)).toEqual("we are bolding nothing")

    expect(ReactDOMServer.renderToStaticMarkup(
    	Search.replacePatternToBold("we are bolding just this", new RegExp("(just this|notthis)", 'ig'))
    	)).toEqual("we are bolding <strong>just this</strong>")
  })

  it("tag stripping", () => {
    expect(Search.stripHTML("<p><br />hi<br /> <h1>hello</h1>")).toEqual("hi hello")
  })

  it("highlight function on node works correctly", () => {
    let node = articleNode
    node.frontmatter.tags = ['a', 'b', 'hello', 'd']
    node.frontmatter.description = "this is my beautiful description"
    node.frontmatter.author = "Napolean"

    // search description
    Search.highlightNode(node, 'beautiful')
    expect(ReactDOMServer.renderToStaticMarkup(node.highlightedText)).toEqual("this is my <strong>beautiful</strong> description")

    // search tags
    Search.highlightNode(node, 'hello')
    expect(ReactDOMServer.renderToStaticMarkup(node.highlightedText)).toEqual("a, b, <strong>hello</strong>, d")

    // search author
    Search.highlightNode(node, 'Napolean')
    expect(ReactDOMServer.renderToStaticMarkup(node.highlightedText)).toEqual("<strong>Napolean</strong>")

    // search capitalisied tags
    Search.highlightNode(node, 'HELLO')
    expect(ReactDOMServer.renderToStaticMarkup(node.highlightedText)).toEqual("a, b, <strong>hello</strong>, d")

    // search missing, default to description
    Search.highlightNode(node, 'Waldo')
    expect(ReactDOMServer.renderToStaticMarkup(node.highlightedText)).toEqual("this is my beautiful description")

    // search two words in description
    Search.highlightNode(node, 'description beautiful')
    expect(ReactDOMServer.renderToStaticMarkup(node.highlightedText)).toEqual("this is my <strong>beautiful</strong> <strong>description</strong>")
  })

  it("get suggested nodes should find popular nodes", () => {
    expect(getSuggestedEdges(articleList.edges)).toEqual( popularList.edges.slice(0, 3) )
  })

})