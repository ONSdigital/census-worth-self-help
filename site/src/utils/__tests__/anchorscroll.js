import anchorScroll from "../anchorscroll"

jest.useFakeTimers();

let historyListener
let scrollIntoViewMock

document.body.innerHTML = "<H1>Test Text</H1><H2>MORE Text</H2><H3>Extra Text</H3>"

describe("Anchor Scrolling", () => {

  beforeEach(() => {
  	historyListener = jest.fn();

    scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  it("scroll to element", () => {

	let history = {
		"location" : {"hash" : "#test-text"},
		"listen" : historyListener
	}

	anchorScroll(history)
	expect(historyListener).toBeCalled();

    jest.runAllTimers();

	expect(scrollIntoViewMock).toBeCalled();

  })

  it("no element found", () => {

	let history = {
		"location" : {"hash" : "#blurst-text"},
		"listen" : historyListener
	}

	anchorScroll(history)

    jest.runAllTimers();

	expect(scrollIntoViewMock).not.toHaveBeenCalled()

  })

  it("no hash", () => {

	let history = {
		"location" : {"hash" : ""},
		"listen" : historyListener
	}

	anchorScroll(history)

    jest.runAllTimers();

	expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })

  it("change after load", () => {

   	let trigger = null
   	let historyListenerActive = ( functionToTrigger ) => {trigger = functionToTrigger}

	let history = {
		"location" : {"hash" : ""},
		"listen" : historyListenerActive
	}

	anchorScroll(history)

	expect(trigger).not.toBeNull()

	trigger({
		"action" : "POP",
		"location" : {"hash" : "#test-text"}
	})

    jest.runAllTimers();

	expect(scrollIntoViewMock).toBeCalled();
  })
})