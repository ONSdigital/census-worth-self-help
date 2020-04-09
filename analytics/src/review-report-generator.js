require("dotenv").config();

const ReportGenerator = require("./report-generator");
const QueryBuilder = require("./query-builder");
const Matomo = require("./matomo");
const Fetcher = require("./fetcher");
const path = require("path");
const DataProcessor = require("./data-processor");

const authToken = process.env.REPORTING_MATOMO_AUTH_TOKEN;
const reportingDate = process.env.REPORTING_DATE;
const baseUrl = "https://www.analytics.worth.census-gcp.onsdigital.uk/?";

const fetcher = new Fetcher();
const matomo = new Matomo(fetcher, baseUrl, authToken);

const queryBuilder = new QueryBuilder();
const queryParams = queryBuilder
  .setModule("API")
  .setFormat("JSON")
  .setMethod("Events.getAction")
  .setAuthToken(authToken)
  .setIdSite("2")
  .setDate(reportingDate || "yesterday")
  .setSegment("eventCategory==article-feedback-review")
  .setPeriod("day")
  .setExpanded("1")
  .build();

const template = {
  list: "data",
  item: {
    title: "label",
    reviews: "subtable",
  },
  operate: [
    {
      run: (val) => {
        if (val) {
          const returnArray = [];
          val.forEach((subitem) => {
            returnArray.push(subitem.label);
          });
          return returnArray;
        }
      },
      on: "reviews",
    },
  ],
};

const outFolder = path.join(__dirname, "out");
const reportGenerator = new ReportGenerator(outFolder);

const date = new Date();
date.setDate(date.getDate() - 1);

const dateString = `${reportGenerator.getReportDateString()}-reviews-report`;

const outFileName = `${dateString}.csv`;

matomo.getArticleReviews(queryParams).then((res) => {
  const dataProcessor = new DataProcessor();
  dataProcessor.setTemplate(template);
  const processedReviewData = dataProcessor.process(res);

  reportGenerator.generate(outFileName, processedReviewData);
});

console.log(dateString);
