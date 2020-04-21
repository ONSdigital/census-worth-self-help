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
    const querySanitizer = new QuerySanitizer()
    const incorrectToken = "yaers"
    const correctlySpeltToken = "years"
    expect(querySanitizer.sanitize(incorrectToken)).toEqual(correctlySpeltToken)
  })
  
})

//test our tokenizer
//pass in string of multiple tokens incorrectly spelt and correct them
//pass in string containing a token that spell corrects to multiple tokens
