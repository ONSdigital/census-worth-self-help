const Matomo = require("./matomo");
const Fetcher = require("./fetcher");
jest.mock("./fetcher");

const geoLocationData = require("../test-data/geolocation-test-data");
const topTenData = require("../test-data/top-10-page-title");
const uniqueVisitorsData = require("../test-data/unique-visitors");
const totalVisitsData = require("../test-data/total-visits");

const reviewData = require("../test-data/article-reviews");
const ratingsData = require("../test-data/article-ratings");
const totalBookmarkedData = require("../test-data/total-bookmarked");
const callCentreData = require("../test-data/call-field-support");
const mostBookmarkedData = require("../test-data/most-bookmarked");

const baseMatomoUrl = "https://myanalytics/index.php";
// This is not a real secret
const authToken = "a8db522sjf98b537e998512p5f1j70eq";
const geoLocationUrl = `?date=2020-01-01,2020-04-06&expanded=1&filter_limit=5&format=JSON&idSite=12&method=UserCountry.getCity&module=API&period=range&token_auth=${authToken}`;
const top10PagesUrl = `?date=today&expanded=1&filter_limit=20&format=JSON&idSite=12&method=Actions.getPageUrls&module=API&period=month&segment=&token_auth=${authToken}&flat=1`;
const top10TitlesUrl = `?module=API&method=Actions.getPageTitles&idSite=12&period=month&date=today&format=JSON&token_auth=${authToken}&filter_limit=20`;
const visitsUrl = `?date=2019-11-29,2019-11-30&expanded=1&filter_limit=500&format=JSON&idSite=12&method=VisitsSummary.getVisits&module=API&period=range&segment=&token_auth=${authToken}`;
const uniqueVisitorsUrl = `?date=2020-04-05&expanded=1&filter_limit=500&format=JSON&idSite=12&method=VisitsSummary.getUniqueVisitors&module=API&period=day&segment=&token_auth=${authToken}`;
const articleReviewsUrl = `?module=API&period=range&date=2019-11-01,2019-11-30&format=JSON&segment=eventCategory==article-feedback-review&expanded=1&idSite=12&token_auth=${authToken}&method=Events.getAction`;
const articleRatingsUrl = `?module=API&period=range&date=2019-11-01,2019-11-30&format=JSON&secondaryDimension=eventName&flat=1&idSite=12&token_auth=${authToken}&method=Events.getAction`;
const totalBookmarkedUrl = `?module=API&period=range&date=2019-11-01,2019-11-30&format=JSON&segment=eventCategory==article-was-bookmarked&secondaryDimension=eventAction&flat=1&idSite=12&token_auth=${authToken}&method=Events.getCategory`;
const mostBookmarkedUrl = `?module=API&period=range&date=2019-11-01,2019-11-30&format=JSON&flat=1&idSite=12&token_auth=${authToken}&method=Events.getAction`;
const callCensusFieldSupportUrl = `?module=API&format=JSON&segment=eventCategory==census-field-support&flat=1&token_auth=${authToken}&method=Events.getAction&date=today&period=day&idSite=12`;

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

const getCurrentDate = () => new Date();


describe("getter functions", () => {
  test("Gets geolocation data from matomo", async () => {
    setUpFetcher(geoLocationData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);
    const expectedData = geoLocationData;
    const receivedData = await matomoInstance.getGeoLocation(geoLocationUrl);
    expect(receivedData).toEqual(expectedData);
  });

  test("top ten data returned from functions", async () => {
    setUpFetcher(topTenData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = topTenData;
    const receivedData = await matomoInstance.getTopTen(top10PagesUrl);
    expect(receivedData).toEqual(expectedData);
  });

  test("unique visitors data returned from functions", async () => {
    setUpFetcher(uniqueVisitorsData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = uniqueVisitorsData;
    const receivedData = await matomoInstance.getUniqueVisitors(
      uniqueVisitorsUrl
    );
    expect(receivedData).toEqual(expectedData);
  });

  test("total visits data returned from functions", async () => {
    setUpFetcher(totalVisitsData);

    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = totalVisitsData;
    const receivedData = await matomoInstance.getTotalVisits(visitsUrl);
    expect(receivedData).toEqual(expectedData);
  });

  test("article review data returned from functions", async () => {
    setUpFetcher(reviewData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = reviewData;
    const receivedData = await matomoInstance.getArticleReviews(
      articleReviewsUrl
    );
    expect(receivedData).toEqual(expectedData);
  });

  test("article ratings data returned from functions", async () => {
    setUpFetcher(ratingsData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = ratingsData;
    const receivedData = await matomoInstance.getArticleRatings(
      articleRatingsUrl
    );
    expect(receivedData).toEqual(expectedData);
  });

  test("total bookmarked data returned from functions", async () => {
    setUpFetcher(totalBookmarkedData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = totalBookmarkedData;
    const receivedData = await matomoInstance.getHowManyBookmarked(
      totalBookmarkedUrl
    );
    expect(receivedData).toEqual(expectedData);
  });

  test("most bookmarked data returned from functions", async () => {
    setUpFetcher(mostBookmarkedData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = mostBookmarkedData;
    const receivedData = await matomoInstance.getMostBookmarked(
      mostBookmarkedUrl
    );
    expect(receivedData).toEqual(expectedData);
  });

  test("call button data returned from functions", async () => {
    setUpFetcher(callCentreData);
    const matomoInstance = new Matomo(new Fetcher(), baseMatomoUrl, authToken);

    const expectedData = callCentreData;
    const receivedData = await matomoInstance.getCallButton(
      callCensusFieldSupportUrl
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

  // test("url construction with multiple slashes builds correct url", () => {
  //   const expectedBaseUrl = "https://differentUrl/";
  //   const matomoInstance = new Matomo(new Fetcher(), expectedBaseUrl, authToken);

  //   const relativePath = "/my/relative/path?some=param&another=param";
  //   const expectedFullUrl = "https://differentUrl" + relativePath;

  //   expect(matomoInstance.getFullUrl(relativePath)).toEqual(expectedFullUrl);
  // });

  // test("url construction with missing slashes builds correct url", () => {
  //   const expectedBaseUrl = "https://differentUrl";
  //   const matomoInstance = new Matomo(new Fetcher(), expectedBaseUrl, authToken);

  //   const relativePath = "my/relative/path?some=param&another=param";
  //   const expectedFullUrl = "https://differentUrl/" + relativePath;

  //   expect(matomoInstance.getFullUrl(relativePath)).toEqual(expectedFullUrl);
  // });
});
