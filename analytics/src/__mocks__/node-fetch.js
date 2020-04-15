const reviewData = require("../../test-data/article-reviews");

const baseMatomoUrl = "https://myanalytics/index.php?";
// This is not a real secret
const authToken = "a8db522sjf98b537e998512p5f1j70eq";
const articleReviewsUrl = `${baseMatomoUrl}module=API&period=range&date=2019-11-01,2019-11-30&format=JSON&segment=eventCategory==article-feedback-review&expanded=1&idSite=12&token_auth=${authToken}&method=Events.getAction`;

let returnObj = (data) => {
  return {
    data: data,
    json: () => data,
    text: () => data,
    ok: true,
  };
};

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    if (url) {
      switch (url) {
        case "fetcher-test-url":
          resolve(returnObj({ type: "fetcher-test" }));
          break;

        case articleReviewsUrl:
          resolve(returnObj(reviewData));
          break;

        default:
          resolve({ status: 404, ok: false });
      }
    } else {
      resolve({ ok: false });
    }
  });
};

module.exports = fetch;
