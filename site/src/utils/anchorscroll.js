export default (history, timeout = 1000) => {
  let observer
  let timeoutId

  if (!(window).MutationObserver) {
    return
  }

  const reset = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    if (observer) {
      observer.disconnect()
    }
  }

  const convertTextToLink = (text) => {
    return text.toLowerCase().replace(/\s/g, "-")
  }

  const createScrollToElement = (hash) => {

    return () => {
      let headers = [];

      ["h1", "h2", "h3"].forEach( (tag) => { 
        headers = headers.concat(Array.from(document.getElementsByTagName(tag))) 
      })

      let element = headers.find( (header) => convertTextToLink(header.innerText) === hash )

      if (element) {
        element.scrollIntoView()
        reset()
        return true
      }

      return false
    }
  }

  function scroll(hash) {

    if (typeof hash !== 'string') {
      return
    }

    const anchorText = hash.slice(1).toLowerCase()

    if (!anchorText) {
      return
    }

    const scrollToElement = createScrollToElement(anchorText)

    setTimeout(() => {
      if (scrollToElement()) {
        return
      }

      observer = new MutationObserver(scrollToElement)

      observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      })

      timeoutId = setTimeout(reset, timeout)
    })
  }

  // listen for changes
  history.listen(({location, action}) => {
    if (timeoutId) {
      reset()
    }

    if (action !== 'POP') {
      return
    }

    if(location.hash) {
      scroll(location.hash)
    }
  })

  // also trigger on load
  if(history.location.hash) {
    scroll(history.location.hash)
  }
}