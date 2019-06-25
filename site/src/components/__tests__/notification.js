import React from "react"
import renderer from "react-test-renderer"
import Notification from "../notification"
import ReactDOM from 'react-dom'

jest.useFakeTimers();

describe("Notification", () => {
  
  it("renders correctly", () => {
    const tree = renderer
      .create(<Notification text="basic" icon="" hidden={true} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("hide functions", () => {
    // we put it inside a node, so that it doesn't remount
    let node = document.createElement('div');
    let component = ReactDOM.render(<Notification text="basic" icon="" hidden={true} />, node);
    expect(component.hidden).toEqual(true)

    // start timer, notification is showing
    ReactDOM.render(<Notification text="basic" icon="" hidden={false} />, node);
    expect(component.hidden).toEqual(false)
    expect(setTimeout).toHaveBeenCalledTimes(1);
    
    // timer is finished
    jest.runAllTimers();
    expect(component.hidden).toEqual(true)
    expect(component.timedOut).toEqual(true)

    // hide and then show the document
    ReactDOM.render(<Notification text="basic" icon="" hidden={true} />, node);
    expect(component.hidden).toEqual(true)
    ReactDOM.render(<Notification text="basic" icon="" hidden={false} />, node);
    expect(component.hidden).toEqual(false)

  });
})