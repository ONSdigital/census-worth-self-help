export default class Analytics {
  static trackEvent(category, action, name = "", value = "") {
    if (window._paq) {
      window._paq.push(["trackEvent", category, action, name, value])
    }
  }
}