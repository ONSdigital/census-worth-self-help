require("dotenv").config();

const fetcher = require("./fetcher");
const urljoin = require("url-join");

//const baseUrl = `https://analytics.worth.census-gcp.onsdigital.uk/index.php`;
//const query = `?date=2020-01-01,2020-04-06&expanded=1&filter_limit=5&format=JSON&idSite=12&method=UserCountry.getCity&module=API&period=range&token_auth=????????`;

class Matomo {
  constructor(fetcher, baseUrl, authToken) {
    if (!baseUrl) {
      throw new Error("Needs base url");
    }
    if (!authToken) {
      throw new Error("Needs auth token");
    }

    this.fetcher = fetcher;
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  async fetch(url) {
    let result = {};
    try {
      result = await this.fetcher.fetch(url);
    } catch {
      console.error("There was an error fetching from the API");
    }

    return result;
  }

  getBaseUrl() {
    return this.baseUrl;
  }
  getAuthToken() {
    return this.authToken;
  }
  getFullUrl(query) {
    return this.getBaseUrl() + query;
  }

  getGeoLocation(url) {
    return this.fetch(this.getFullUrl(url));
  }

  getTopTen(url) {
    return this.fetch(this.getFullUrl(url));
  }

  getUniqueVisitors(url) {
    return this.fetch(this.getFullUrl(url));
  }

  getTotalVisits(url) {
    return this.fetch(this.getFullUrl(url));
  }

  getArticleReviews(url) {
    return this.fetch(this.getFullUrl(url));
  }

  getArticleRatings(url) {
    return this.fetch(this.getFullUrl(url));
  }

  getHowManyBookmarked(url) {
    return this.fetch(this.getFullUrl(url));
  }

  getMostBookmarked(url) {
    return this.fetch(this.getFullUrl(url));
  }

  getCallButton(url) {
    return this.fetch(this.getFullUrl(url));
  }
}
module.exports = Matomo;
