export default class Dictionary {
  constructor(dictionarySource) {
    if (dictionarySource) {
      this.spellingCorrections = dictionarySource
    } else {
      this.spellingCorrections = { atticle: "article", dimmy: "dummy" }
    }
  }
  getCorrectSpelling(str) {
    return this.spellingCorrections[str] ? this.spellingCorrections[str] : str
  }
}
