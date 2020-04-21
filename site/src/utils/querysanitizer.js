import Dictionary from "./dictionary"
export default class QuerySanitizer {
  constructor(dictionaryDefinition) {
    this.dictionary = new Dictionary(dictionaryDefinition)
  }

  sanitize(query) {
    const tokenizedQuery = this.tokenize(query)
    let correctlySpeltTokens = []
    tokenizedQuery.forEach(token => {
      correctlySpeltTokens.push(this.dictionary.getCorrectSpelling(token))
    })
    const reassembledQuery = correctlySpeltTokens.join(" ")
    return reassembledQuery
  }

  tokenize(query) {
    // elasticlunr uses /[\s\-]+/
    // return str.toString().trim().toLowerCase().split(elasticlunr.tokenizer.seperator);
    let modifiedQuery = query
    modifiedQuery
      .toString()
      .trim()
      .toLowerCase()

    return modifiedQuery.split(/[\s\-]+/)
  }
}
