const fetch = require("node-fetch");

class Fetcher {
  fetch(url) {
    return fetch(url)
      .then((res) => {
        if (res.ok) {
          const jsonout = res.json();
          return jsonout;
        } else {
          const fetchError = new Error("Error calling fetch");
          fetchError.status = res.status;
          throw fetchError;
        }
      })
      .catch(() => {
        console.error("Error resolving promise");
      });
  }
}
module.exports = Fetcher;
