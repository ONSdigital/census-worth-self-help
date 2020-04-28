import SearchHistory from "../searchhistory"
const localForage = require("localforage")

describe("SearchHistory", () => {
  it("Can be instantiated", () => {
    const searchHistory = new SearchHistory("some key")
    expect(searchHistory).toBeTruthy()
    expect(searchHistory).toBeInstanceOf(SearchHistory)
  })

  it("Storing a search item is possible", () => {
    const spy = jest.spyOn(localForage, "setItem").mockImplementation(
      value =>
        new Promise((resolve, reject) => {
          resolve(value)
        })
    )

    const searchKey = "some key"
    const queryText = "some random query"
    const searchHistory = new SearchHistory(searchKey)
    searchHistory.store(queryText)
    expect(spy).toBeCalledWith(searchKey, queryText, expect.any(Function))
    spy.mockRestore()
  })

  it("Retrieving a search item is possible", async () => {
    const expected = "stored query"
    const spy = jest.spyOn(localForage, "getItem").mockImplementation(
      () =>
        new Promise(resolve => {
          resolve(expected)
        })
    )

    const searchKey = "some key"
    const searchHistory = new SearchHistory(searchKey)

    searchHistory.retrieve(value => {
      expect(spy).toBeCalledWith(searchKey, expect.any(Function))
      expect(value).toEqual(expected)
      spy.mockRestore()
    })
  })
})
