require("dotenv").config();

const fetcher = require("./fetcher");

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
    } catch (e) {
      console.error("There was an issue with fetching from the API");
      e.status && console.error(`Error code was ${e.status}`);
      process.exit(1);
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
