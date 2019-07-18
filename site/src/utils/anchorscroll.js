export default (history, timeout = 1000) => {
  let observer
  let timeoutId

  const reset = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    if (observer) {
      observer.disconnect()
    }
  }

  const convertTextToLink = text => {
    return text.toLowerCase().replace(/\s/g, "-")
  }

  const createScrollToElement = hash => {
    return () => {
      let headers = []
      let tags = ["h1", "h2", "h3"]

      tags.forEach(tag => {
        headers = headers.concat(Array.from(document.getElementsByTagName(tag)))
      })

      let element = headers.find(
        header => convertTextToLink(header.textContent) === hash
      )

      if (element) {
        element.scrollIntoView()
        reset()
        return true
      }

      return false
    }
  }

  function scroll(anchorText) {

    if (!anchorText) {
      return
    }

    const scrollToElement = createScrollToElement(anchorText)

    setTimeout(() => {
      if (scrollToElement()) {
        return
      }

      if (window.MutationObserver) {
        observer = new MutationObserver(scrollToElement)

        observer.observe(document, {
          attributes: true,
          childList: true,
          subtree: true
        })
      }

      timeoutId = setTimeout(reset, timeout)
    })
  }

  // listen for changes
  history.listen(({ location, action }) => {
    if (timeoutId) {
      reset()
    }

    if (action !== "POP") {
      return
    }

    if (location.hash && typeof location.hash === "string") {
      scroll(location.hash.replace(/[^A-Za-z0-9-]/g, ''))
    }
  })

  // also trigger on load
  if (history.location.hash && typeof history.location.hash === "string") {
    scroll(history.location.hash.replace(/[^A-Za-z0-9-]/g, ''))
  }
}
