import Dictionary from "./dictionary"

const defaultTokenSeparator = /[\s\-]+/

export default class QuerySanitizer {
  constructor(dictionaryDefinition, tokenSeparator) {
    this.dictionary = new Dictionary(dictionaryDefinition)
    this.tokenSeparator = tokenSeparator ? tokenSeparator : defaultTokenSeparator
  }

  correctTokenSpelling(tokens) {
    let correctlySpeltTokens = []

    if(tokens) {
      tokens.forEach(token => {
        correctlySpeltTokens.push(this.dictionary.getCorrectSpelling(token))
      })
    }

    return correctlySpeltTokens
  }

  buildQueryFromTokens(tokens) {
    return tokens ? tokens.join(" ") : ""
  }

  sanitize(query) {
    const tokens = this.tokenize(query)
    const correctlySpeltTokens = this.correctTokenSpelling(tokens)
    const reassembledQuery = this.buildQueryFromTokens(correctlySpeltTokens)

    return reassembledQuery
  }

  tokenize(query) {
    if(!query) return []

    return query
      .toString()
      .trim()
      .toLowerCase()
      .split(this.tokenSeparator)
  }
}
