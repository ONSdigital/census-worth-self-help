const Fetcher = require("./fetcher");

test("JSON function returns the json from API call or errors gracefully", async () => {
  const fetcher = new Fetcher(); 
  const returnedInvalidApiCall = await fetcher.fetch();
  expect(returnedInvalidApiCall).toEqual("error");

  const returnedValidApiCall = await fetcher.fetch("fetcher-test-url");
  expect(returnedValidApiCall).toEqual({ type: "fetcher-test" });
});
