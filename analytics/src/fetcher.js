const fetch = require("node-fetch");

class Fetcher {
  fetch(url) {
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        const fetchError = new Error("Error calling fetch");
        fetchError.status = res.status;
        throw fetchError;
      }
    });
  }
}
module.exports = Fetcher;
