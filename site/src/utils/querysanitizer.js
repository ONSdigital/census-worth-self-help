import Dictionary from "./dictionary"
export default class QuerySanitizer {
  constructor() {
    this.dictionary = new Dictionary({ yaers: "years" })
  }

  sanitize(query) {
    return this.dictionary.getCorrectSpelling(query)
  }
}
