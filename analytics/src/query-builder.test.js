const QueryBuilder = require("./query-builder");

describe("Query builder", () => {
  test("Query builder is instantiated", () => {
    const queryBuilder = new QueryBuilder();
    expect(queryBuilder === null).toBeFalsy();
  });

  test("Build method returns a non empty string", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const builtQuery = queryBuilder.build();
    expect(builtQuery.length > 0).toBeTruthy();
  });

  test("when auth token added then return query including auth token", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const authToken = "a4BXy8djF8f1dd";
    queryBuilder.setAuthToken(authToken);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`token_auth=${authToken}`)).toBeTruthy();
  });

  test("when idSite is added then return query including idSite", () => {
    const queryBuilder = new QueryBuilder();
    const expectedQuery = "colour=RED&name=ted";
    const idSite = "12";
    queryBuilder.setIdSite(idSite);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`idSite=${idSite}`)).toBeTruthy();
  });

  test("when no format is set then return query including default format value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`format=JSON`)).toBeTruthy();
  });

  test("when format is added then return query including format", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const format = "JSON";
    queryBuilder.setFormat(format);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`format=${format}`)).toBeTruthy();
  });

  test("when no module is set then return query including default module value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`module=API`)).toBeTruthy();
  });

  test("when module is set then return query including module value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const module = "API";
    queryBuilder.setModule(module);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`module=${module}`)).toBeTruthy();
  });

  test("when segment is set then return query including segment value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const segment = "testsegment";
    queryBuilder.setSegment(segment);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`segment=${segment}`)).toBeTruthy();
  });

  test("when flat is set then return query including flat value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const flat = "1";
    queryBuilder.setFlat(flat);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`flat=${flat}`)).toBeTruthy();
  });

  test("when method is set then return query including method value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const method = "method";
    queryBuilder.setMethod(method);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`method=${method}`)).toBeTruthy();
  });

  test("when date is set then return query including date value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const date = "date";
    queryBuilder.setDate(date);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`date=${date}`)).toBeTruthy();
  });

  test("when period is set then return query including period value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const period = "period";
    queryBuilder.setPeriod(period);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`period=${period}`)).toBeTruthy();
  });

  test("when filter_truncate is set then return query including filter_truncate value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const filterTruncate = "filter_truncate";
    queryBuilder.setFilterTruncate(filterTruncate);
    const builtQuery = queryBuilder.build();
    expect(
      builtQuery.includes(`filter_truncate=${filterTruncate}`)
    ).toBeTruthy();
  });

  test("when secondaryDimension is set then return query including secondaryDimension value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const secondaryDimension = "secondaryDimension";
    queryBuilder.setSecondaryDimension(secondaryDimension);
    const builtQuery = queryBuilder.build();
    expect(
      builtQuery.includes(`secondaryDimension=${secondaryDimension}`)
    ).toBeTruthy();
  });

  test("when expanded is set then return query including expanded value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const expanded = "expanded";
    queryBuilder.setExpanded(expanded);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`expanded=${expanded}`)).toBeTruthy();
  });

  test("when filter_limit is set then return query including filterLimit value", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const expectedQuery = "colour=RED&name=ted";
    const filterLimit = "filterLimit";
    queryBuilder.setFilterLimit(filterLimit);
    const builtQuery = queryBuilder.build();
    expect(builtQuery.includes(`filter_limit=${filterLimit}`)).toBeTruthy();
  });

  test("There is no leading ampersand and no undefined data at the start of the query", () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setIdSite("1");

    const filterLimit = "filterLimit";
    queryBuilder.setFilterLimit(filterLimit);
    const builtQuery = queryBuilder.build();
    expect(builtQuery[0]).not.toBe("&");
    expect(builtQuery.startsWith("undefined")).toBeFalsy();
  });

  test("site ID is a required parameter", () => {
    const queryBuilder = new QueryBuilder();

    expect(() => queryBuilder.build()).toThrow();
  });
});

describe("fluent interface", () => {
  const queryBuilder = new QueryBuilder();

  test("setFilterLimit is fluent", () => {
    expect(queryBuilder.setFilterLimit("blah")).toBe(queryBuilder);
  });

  test("setModule is fluent", () => {
    expect(queryBuilder.setModule("blah")).toBe(queryBuilder);
  });

  test("setPeriod is fluent", () => {
    expect(queryBuilder.setPeriod("blah")).toBe(queryBuilder);
  });

  test("setSegment is fluent", () => {
    expect(queryBuilder.setSegment("blah")).toBe(queryBuilder);
  });

  test("setMethod is fluent", () => {
    expect(queryBuilder.setMethod("blah")).toBe(queryBuilder);
  });

  test("setDate is fluent", () => {
    expect(queryBuilder.setDate("blah")).toBe(queryBuilder);
  });

  test("setAuthToken is fluent", () => {
    expect(queryBuilder.setAuthToken("blah")).toBe(queryBuilder);
  });

  test("setFlat is fluent", () => {
    expect(queryBuilder.setFlat("blah")).toBe(queryBuilder);
  });

  test("setExpanded is fluent", () => {
    expect(queryBuilder.setExpanded("blah")).toBe(queryBuilder);
  });

  test("setFilterTruncate is fluent", () => {
    expect(queryBuilder.setFilterTruncate("blah")).toBe(queryBuilder);
  });

  test("setSecondaryDimension is fluent", () => {
    expect(queryBuilder.setSecondaryDimension("blah")).toBe(queryBuilder);
  });

  test("setIdSite is fluent", () => {
    expect(queryBuilder.setIdSite("blah")).toBe(queryBuilder);
  });

  test("setFormat is fluent", () => {
    expect(queryBuilder.setFormat("blah")).toBe(queryBuilder);
  });
});

describe("emergent behaviour", () => {
  test("Query can be formed with all parameters", () => {
    const expectedQueryParams = [
      "module=API",
      "format=JSON",
      "method=abc.getXYZ",
      "token_auth=a3fQ2f8dD",
      "idSite=12",
      "date=today",
      "segment=aSegment",
      "period=week",
      "filter_limit=15",
      "expanded=1",
      "filter_truncate=1",
      "secondaryDimension=action",
    ];

    const queryBuilder = new QueryBuilder();
    const actualQueryParams = queryBuilder
      .setModule("API")
      .setFormat("JSON")
      .setMethod("abc.getXYZ")
      .setAuthToken("a3fQ2f8dD")
      .setIdSite("12")
      .setDate("today")
      .setSegment("aSegment")
      .setPeriod("week")
      .setFilterLimit("15")
      .setExpanded("1")
      .setFilterTruncate("1")
      .setSecondaryDimension("action")
      .build()
      .split("&");

    expect(actualQueryParams).toEqual(expectedQueryParams);
  });
});
