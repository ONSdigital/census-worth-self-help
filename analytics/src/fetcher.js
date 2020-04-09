const fetch = require("node-fetch");

class Fetcher {
  fetch(url) {
    return fetch(url)
      .then((res) => res.json())
      .catch((error) => console.error(error));
  }
}
module.exports = Fetcher;
