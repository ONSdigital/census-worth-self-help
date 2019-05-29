module.exports = {
  authCallback: function (authorisationUri) {
    return (request, response) => {
      response.redirect(authorisationUri)
    }
  }
}
