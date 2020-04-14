const ReportGenerator = require("./report-generator");
describe("Testing date boundaries with report generator", () => {
  let _Date;
  beforeEach(() => {
    _Date = Date;
  });
  afterEach(() => {
    global.Date = _Date;
  });

  test("date year boundaries", () => {
    const dateToUse = "1979-01-01T11:01:58.135Z";
    const mockDate = new Date(dateToUse);

    global.Date = jest.fn(() => mockDate);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;

    const reportGenerator = new ReportGenerator("");
    const expectedDateString = "1978-12-31";
    const actualDateString = reportGenerator.getReportDateString();
    expect(actualDateString).toEqual(expectedDateString);
  });

  test("date month boundaries", () => {
    const dateToUse = "1979-02-01T11:01:58.135Z";
    const mockDate = new Date(dateToUse);

    global.Date = jest.fn(() => mockDate);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;

    const reportGenerator = new ReportGenerator("");
    const expectedDateString = "1979-01-31";
    const actualDateString = reportGenerator.getReportDateString();
    expect(actualDateString).toEqual(expectedDateString);
  });

  test("date leap year boundaries", () => {
    const dateToUse = "2020-03-01T11:01:58.135Z";
    const mockDate = new Date(dateToUse);

    global.Date = jest.fn(() => mockDate);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;

    const reportGenerator = new ReportGenerator("");
    const expectedDateString = "2020-02-29";
    const actualDateString = reportGenerator.getReportDateString();
    expect(actualDateString).toEqual(expectedDateString);
  });
});
