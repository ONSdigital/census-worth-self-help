const Matomo = require("./matomo");
const Fetcher = require("./fetcher");
jest.mock("./fetcher");

const reviewData = require("../test-data/article-reviews");

const baseMatomoUrl = "https://myanalytics/index.php";
// This is not a real secret
const authToken = "a8db522sjf98b537e998512p5f1j70eq";
const articleReviewsUrl = `?module=API&period=range&date=2019-11-01,2019-11-30&format=JSON&segment=eventCategory==article-feedback-review&expanded=1&idSite=12&token_auth=${authToken}&method=Events.getAction`;

setUpFetcher = (data) => {
  Fetcher.mockImplementationOnce(() => {
    return {
      fetch: (url) =>
        new Promise((resolve) => {
          resolve(data);
        }),
    };
  });
};

describe("getter functions", () => {
  test("article review data returned from functions", async () => {
    setUpFetcher(reviewData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = reviewData;
    const receivedData = await matomoInstance.getArticleReviews(
      articleReviewsUrl
    );
    expect(receivedData).toEqual(expectedData);
  });
});
describe("test contructor  plus baseurl getter/setter", () => {
  test("constructor takes an argument and assigns it to a class variable", () => {
    const expectedBaseUrl = "differentUrl";
    const matomoInstance = new Matomo(
      new Fetcher(),
      expectedBaseUrl,
      authToken
    );
    expect(matomoInstance.getBaseUrl()).toEqual(expectedBaseUrl);
    expect(matomoInstance.getAuthToken()).toEqual(authToken);
  });

  test("constructor can't be empty", () => {
    expect(() => {
      new Matomo(new Fetcher());
    }).toThrow();
  });

  test("constructor HAS to receive a base url AND auth token", () => {
    expect(() => {
      new Matomo(new Fetcher(), baseMatomoUrl);
    }).toThrow("Needs auth token");
  });

  test("url construction builds correct url", () => {
    const expectedBaseUrl = "https://differentUrl";
    const matomoInstance = new Matomo(
      new Fetcher(),
      expectedBaseUrl,
      authToken
    );

    const relativePath = "/my/relative/path?some=param&another=param";
    const expectedFullUrl = expectedBaseUrl + relativePath;

    expect(matomoInstance.getFullUrl(relativePath)).toEqual(expectedFullUrl);
  });
});
