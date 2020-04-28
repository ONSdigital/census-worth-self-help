const localforage = require("localforage")

const defaultSearchKey = "searchHistory"

export default class SearchHistory {
  constructor(key, isLoggingEnabled) {
    this.key = key ? key : defaultSearchKey
    this.isLoggingEnabled = !!isLoggingEnabled
  }

  store(queryText) {
    localforage.setItem(this.key, queryText, onSuccess => {
      if (this.isLoggingEnabled) {
        console.log(
          `Updated search history key=${this.key}, query=${queryText}`
        )
      }
    })
  }

  retrieve(callback) {
    localforage.getItem(this.key, callback)
  }
}
