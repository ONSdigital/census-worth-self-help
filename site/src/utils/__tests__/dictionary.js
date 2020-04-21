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
  test("given a correct spelling", () => {
    const dictionary = new Dictionary()
    const initialString = "article"
    const returnedString = dictionary.getCorrectSpelling()
    expect(returnedString).toEqual(initialString)
  })
})
