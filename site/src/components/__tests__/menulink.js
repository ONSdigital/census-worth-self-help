import React from "react"
import renderer from "react-test-renderer"
import MenuLink from "../menulink"
import { render, fireEvent } from "react-testing-library"

describe("MenuLink", () => {
  let hidden_nodes = [
		{title:'child1', link:'child1', children:[]}, {title:'child2', link:'child2',
			 children: [{title:'grandchild1', link:'grandchild1'}, {title:'grandchild2', link:'grandchild2'}]
			}
  ]

  it("renders correctly without hidden nodes", () => {
    const tree = renderer
      .create(<MenuLink title="basic" link="basic" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with hidden nodes", () => {
    const tree = renderer
      .create(<MenuLink title="basic" link="basic" hidden_nodes={hidden_nodes}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("toggling hidden nodes", () => {
  	  // Click the toggle button, child container should appear and dissappear
  	const { getByTestId, getAllByTestId, queryByTestId } = render(<MenuLink title="basic" link="basic" hidden_nodes={hidden_nodes}/>);
  	
  	expect(queryByTestId('child-container')).toBeNull()

  	fireEvent.click(getByTestId('toggle-button'));

  	expect(getByTestId('child-container')).toBeDefined()

  	fireEvent.click(getAllByTestId('toggle-button')[0]);

  	expect(queryByTestId('child-container')).toBeNull()
  });
})