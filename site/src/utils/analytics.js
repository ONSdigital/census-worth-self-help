export default class Analytics {
  static trackEvent(category, action, name = "", value = "") {
    if (window._paq) {
      window._paq.push(["trackEvent", category, action, name, value])
    } else {
      console.debug(`Track event not set : ${category} - ${action} - ${name} - ${value}`)
    }
  }

  static trackSiteSearch(keyword, category, searchCount) {
    if (window._paq) {
      window._paq.push(["trackSiteSearch", keyword, category, searchCount])
    } else {
      console.debug(`Track site search : ${keyword} - ${category} - ${searchCount}`)
    }
  }

  static setPageType(pageType) {
    if (typeof window !== `undefined` && window._paq) {
      window._paq.push(["setCustomDimension", 1, pageType])
    }
  }
}