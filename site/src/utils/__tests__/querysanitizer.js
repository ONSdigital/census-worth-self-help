import QuerySanitizer from "../querysanitizer"
describe("query sanitizer", () => {
  test("can be instantiated", () => {
    const querySanitizer = new QuerySanitizer()
    expect(querySanitizer).toBeTruthy()
  })
  test("is of right class type", () => {
    const querySanitizer = new QuerySanitizer()
    expect(querySanitizer).toBeInstanceOf(QuerySanitizer)
  })
  test("pass in empty string get empty string", () => {
    const querySanitizer = new QuerySanitizer()
    expect(querySanitizer.sanitize("")).toEqual("")
  })
  test("pass in string of 1 token correctly spelt return it", () => {
    const querySanitizer = new QuerySanitizer()
    const singleToken = "blah"
    expect(querySanitizer.sanitize(singleToken)).toEqual(singleToken)
  })
  test("pass in string of multiple tokens correctly spelt return it", () => {
    const querySanitizer = new QuerySanitizer()
    const multipleToken = "blah blah blah"
    expect(querySanitizer.sanitize(multipleToken)).toEqual(multipleToken)
  })
  test("pass in string of 1 token incorrectly spelt correct it", () => {
    const querySanitizer = new QuerySanitizer({ yaers: "years" })
    const incorrectToken = "yaers"
    const correctlySpeltToken = "years"
    expect(querySanitizer.sanitize(incorrectToken)).toEqual(correctlySpeltToken)
  })
  test("If tokenize is given an empty string it returns an empty string", () => {
    const querySanitizer = new QuerySanitizer()
    expect(querySanitizer.tokenize("")).toEqual([""])
  })
  test("If tokenize is given a single token string it returns an empty string", () => {
    const querySanitizer = new QuerySanitizer()
    expect(querySanitizer.tokenize("blah")).toEqual(["blah"])
  })
  test("The query sanitizer can tokenize a string", () => {
    const querySanitizer = new QuerySanitizer()

    expect(querySanitizer.tokenize("this string")).toEqual(["this", "string"])
  })
  test("pass in string of multiple tokens incorrectly spelt and correct them", () => {
    const querySanitizer = new QuerySanitizer({
      yaers: "years",
      yeild: "yield"
    })

    const incorrectQuery = "yaers yeild"
    const correctlySpeltQuery = "years yield"
    expect(querySanitizer.sanitize(incorrectQuery)).toEqual(correctlySpeltQuery)
  })
  test("pass in a longer string of multiple tokens incorrectly spelt and correct them", () => {
    const querySanitizer = new QuerySanitizer({
      yaers: "years",
      yeild: "yield",
      aborigene: "aborigine",
      accesories: "accessories",
      accidant: "accident",
      abortificant: "abortifacient",
      abreviate: "abbreviate",
    })

    const incorrectQuery = "yaers yeild aborigene accesories accidant abortificant abreviate"
    const correctlySpeltQuery = "years yield aborigine accessories accident abortifacient abbreviate"
    expect(querySanitizer.sanitize(incorrectQuery)).toEqual(correctlySpeltQuery)
  })
  test("pass in a longer string of multiple tokens where some are incorrectly spelt and correct them if they are in the dictionary", () => {
    const querySanitizer = new QuerySanitizer({
      yaers: "years",
      yeild: "yield",
      aborigene: "aborigine",
      accesories: "accessories",
      accidant: "accident",
      abortificant: "abortifacient",
      abreviate: "abbreviate",
    })

    const incorrectQuery = "yaers yeild aborigine accesories accidant abortifacient abreviate wertyu"
    const correctlySpeltQuery = "years yield aborigine accessories accident abortifacient abbreviate wertyu"
    expect(querySanitizer.sanitize(incorrectQuery)).toEqual(correctlySpeltQuery)
  })
  test("pass in a longer string of multiple tokens where some are incorrectly spelt and correct them if they are in the dictionary", () => {
    const querySanitizer = new QuerySanitizer({
      yaers: "years",
      yeild: "yield",
      aborigene: "aborigine"
    })

    const incorrectQuery = "yaers! yeild ? $%^&*^:'; aborigine =+"
    const correctlySpeltQuery = "yaers! yield ? $%^&*^:'; aborigine =+"
    expect(querySanitizer.sanitize(incorrectQuery)).toEqual(correctlySpeltQuery)
  })
})

