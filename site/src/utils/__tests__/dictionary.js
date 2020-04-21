import Dictionary from "../dictionary"

describe("dictionary", () => {
  test("can be instantiated", () => {
    const dictionary = new Dictionary()
    expect(dictionary).toBeTruthy()
  })
  test("is of right class type", () => {
    const dictionary = new Dictionary()
    expect(dictionary).toBeInstanceOf(Dictionary)
  })
  test("given a correct spelling, return it unchanged", () => {
    const dictionary = new Dictionary()
    const initialString = "article"
    const returnedString = dictionary.getCorrectSpelling(initialString)
    expect(returnedString).toEqual(initialString)
  })
  test("when given misspellings not in the dictionary, they are returned unchanged", () => {
    const unknownInitialString = "aoidnaownaondaodn"
    const dictionary = new Dictionary()
    const returnedString = dictionary.getCorrectSpelling(unknownInitialString)
    expect(returnedString).toEqual(unknownInitialString)
  })
  test("when given a misspelling that is found in the dictionary, it does not return it unchanged", () => {
    const dictionary = new Dictionary()
    const initialSpelling = "atticle"
    const returnedSpelling = dictionary.getCorrectSpelling(initialSpelling)
    expect(returnedSpelling).not.toEqual(initialSpelling)
  })
  test("a word's spelling gets corrected when wrong, and the incorrect spelling is known", () => {
    const dictionary = new Dictionary()
    const initialSpelling = "atticle"
    const returnedSpelling = dictionary.getCorrectSpelling(initialSpelling)
    const correctSpelling = "article"
    expect(returnedSpelling).toEqual(correctSpelling)
  })
  test("when given a misspelling in the dictionary, return the corrected spelling", () => {
    const dictionary = new Dictionary()
    const initialSpelling = "dimmy"
    const returnedSpelling = dictionary.getCorrectSpelling(initialSpelling)
    const correctSpelling = "dummy"
    expect(returnedSpelling).toEqual(correctSpelling)
  })
  test("when initialised with a dictionary source, the dictionary is initialised", () => {
    const dictionary = new Dictionary({ misspelling: "correctSpelling" })
    expect(dictionary).toBeTruthy()
  })
  test("when initialised with a dictionary source, the dictionary can correct misspellings in the source", () => {
    const wrongSpelling = "tesst"
    const correctSpelling = "test"

    let dictionary = new Dictionary()

    expect(dictionary.getCorrectSpelling(wrongSpelling)).not.toEqual(
      correctSpelling
    )

    let newDictionarySource = {}
    newDictionarySource[wrongSpelling] = correctSpelling
    dictionary = new Dictionary(newDictionarySource)

    expect(dictionary.getCorrectSpelling(wrongSpelling)).toEqual(
      correctSpelling
    )
  })
  test("the correct spelling is returned for multiple misspellings", () => {
    const firstWrongSpelling = "tesst"
    const secondWrongSpelling = "tessst"
    const correctSpelling = "test"

    let newDictionarySource = {}
    newDictionarySource[firstWrongSpelling] = correctSpelling
    newDictionarySource[secondWrongSpelling] = correctSpelling
    const dictionary = new Dictionary(newDictionarySource)

    expect(dictionary.getCorrectSpelling(firstWrongSpelling)).toEqual(correctSpelling)
    expect(dictionary.getCorrectSpelling(secondWrongSpelling)).toEqual(correctSpelling)
  })
})
