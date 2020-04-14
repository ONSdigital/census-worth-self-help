const fetch = require("node-fetch");

class Fetcher {
  fetch(url) {
    return fetch(url)
      .then((res) => res.json())
      .catch(() => console.error("There was an error fetching from the API"));
  }
}
module.exports = Fetcher;
