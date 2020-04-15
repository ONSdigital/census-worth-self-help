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
      .catch((e) => {
        console.error(e);
      });
  }
}
module.exports = Fetcher;
