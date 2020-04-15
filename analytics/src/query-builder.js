class QueryBuilder {
  constructor() {
    this.queryParams = new Map();
    this.queryParams.set("module", "API");
    this.queryParams.set("format", "JSON");
  }

  build() {
    let path = "";
    if (!this.queryParams.get("idSite")) {
      throw new Error("site id required");
    }
    this.queryParams.forEach((value, key) => {
      if (path.length > 0) {
        path = `${path}&${key}=${value}`;
      } else {
        path = `${key}=${value}`;
      }
    });

    return this.sanitize(path);
  }

  sanitize(inputString) {
    const sanitizedString = inputString.replace(/%0A/gi, "");
    return sanitizedString;
  }
  setAuthToken(authToken) {
    this.queryParams.set("token_auth", authToken);
    return this;
  }

  setIdSite(idSite) {
    this.queryParams.set("idSite", idSite);
    return this;
  }

  setFormat(format) {
    this.queryParams.set("format", format);
    return this;
  }

  setModule(moduleName) {
    this.queryParams.set("module", moduleName);
    return this;
  }
  setSegment(segment) {
    this.queryParams.set("segment", segment);
    return this;
  }
  setFlat(flat) {
    this.queryParams.set("flat", flat);
    return this;
  }
  setMethod(method) {
    this.queryParams.set("method", method);
    return this;
  }
  setDate(date) {
    this.queryParams.set("date", date);
    return this;
  }
  setPeriod(period) {
    this.queryParams.set("period", period);
    return this;
  }
  setFilterTruncate(filterTruncate) {
    this.queryParams.set("filter_truncate", filterTruncate);
    return this;
  }
  setSecondaryDimension(secondaryDimension) {
    this.queryParams.set("secondaryDimension", secondaryDimension);
    return this;
  }
  setExpanded(expanded) {
    this.queryParams.set("expanded", expanded);
    return this;
  }

  setFilterLimit(filterLimit) {
    this.queryParams.set("filter_limit", filterLimit);
    return this;
  }
}
module.exports = QueryBuilder;
