const ReportGenerator = require("./report-generator");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const processedReviewData = require("../test-data/processed-data-reviews");

const DATE_TO_USE = "1979-02-22T11:01:58.135Z";
let _Date;

describe("report generator", () => {
  beforeEach(() => {
    const MOCK_DATE = new Date(DATE_TO_USE);
    _Date = Date;
    global.Date = jest.fn(() => MOCK_DATE);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;
  });

  afterEach(() => {
    global.Date = _Date;
  });

  test("can set and get output path", () => {
    const expectedPath = path.join(__dirname, "out");
    const reportGenerator = new ReportGenerator(expectedPath);
    expect(reportGenerator.getPath()).toEqual(expectedPath);
  });

  test("convert JSON to CSV for review data", () => {
    const outfolder = path.join(__dirname, "out");
    const reportGenerator = new ReportGenerator(outfolder);

    const actualOutput = reportGenerator.jsonToCSV(processedReviewData);
    const reviewsReportCsv = fs.readFileSync(
      path.join(__dirname, "../test-data/reviews-report.csv"),
      "UTF8"
    );

    expect(actualOutput.split(",")).toEqual(reviewsReportCsv.split(","));
  });

  test("Can write a csv file with output from processing review data", () => {
    const outfolder = path.join(__dirname, "out");

    const reportGenerator = new ReportGenerator(outfolder);
    const outFileName = "MyTestFile.csv";
    const actualOutput = reportGenerator.generate(
      outFileName,
      processedReviewData
    );

    const reviewsReportCsv = fs.readFileSync(
      path.join(__dirname, "../test-data/reviews-report.csv"),
      "UTF8"
    );

    const outFilePath = path.join(outfolder, outFileName);
    expect(actualOutput).toEqual(reviewsReportCsv);
    fs.unlinkSync(outFilePath);
  });

  test("out folder gets created when it doesn't exist", () => {
    rimraf.sync(path.join(__dirname, "out"));
    const outfolder = path.join(__dirname, "out");

    const reportGenerator = new ReportGenerator(outfolder);
    const outFileName = "MyTestFile.csv";
    reportGenerator.generate(outFileName, processedReviewData);

    const outFilePath = path.join(outfolder, outFileName);

    expect(fs.existsSync(outfolder)).toBeTruthy();
    expect(fs.existsSync(outFilePath)).toBeTruthy();

    fs.unlinkSync(outFilePath);
  });

  test("Replace individual double quotes with two double quotes", () => {
    const outfolder = path.join(__dirname, "out");

    const reportGenerator = new ReportGenerator(outfolder);
    const inputCsv = `My name is "Bob"`;
    const expectedCsv = `My name is ""Bob""`;
    const actualCsv = reportGenerator.sanitize(inputCsv);

    expect(actualCsv).toEqual(expectedCsv);
  });

  test("Return date string for yesterday", () => {
    const reportGenerator = new ReportGenerator("");
    const expectedDateString = "1979-02-21";
    const actualDateString = reportGenerator.getReportDateString();
    expect(actualDateString).toEqual(expectedDateString);
  });
});
