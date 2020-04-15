const Fetcher = require("./fetcher");
jest.mock("node-fetch");

test("JSON Function errors gracefully", async () => {
  const fetcher = new Fetcher();
  try {
    await fetcher.fetch();
  } catch (e) {
    expect(e.toString()).toEqual("Error: Error calling fetch");
  }
});
test("JSON function returns the json from API call", async () => {
  const fetcher = new Fetcher();
  const returnedValidApiCall = await fetcher.fetch("fetcher-test-url");
  expect(returnedValidApiCall).toEqual({ type: "fetcher-test" });
});
