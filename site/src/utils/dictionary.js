export default class Dictionary {
  constructor(translationMap) {
    this.spellingCorrections = translationMap ? translationMap : {}
  }
  
  getCorrectSpelling(str) {
    return this.spellingCorrections[str] ? this.spellingCorrections[str] : str
  }
}
