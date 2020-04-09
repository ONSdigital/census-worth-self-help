const DataProcessor = require("./data-processor");

const reviewData = require("../test-data/article-reviews");

test("When given no transform, return input data", () => {
  const dataProcessor = new DataProcessor();
  const returnedJSON = dataProcessor.process(reviewData);
  const expectedJSON = reviewData;
  expect(returnedJSON).toEqual({ data: expectedJSON });
});

test("When given a simple empty map, the entry data is stripped down to an empty array", () => {
  const dataProcessor = new DataProcessor();
  const template = {};
  dataProcessor.setTemplate(template);

  const returnedJSON = dataProcessor.process(reviewData);
  const expectedJSON = reviewData;
  expect(returnedJSON).not.toEqual(expectedJSON);
});

test("When given a more complex map, the entry data is stripped down to just titles", () => {
  const dataProcessor = new DataProcessor();
  const template = {
    list: "data",
    item: {
      label: "label",
    },
  };
  dataProcessor.setTemplate(template);

  const returnedJSON = dataProcessor.process(reviewData);

  const expectedJSON = {
    label: "REVIEW: When to use the outcome code “have completed”",
  };

  expect(returnedJSON[0]).toEqual(expectedJSON);
});

test("List individual reviews for the first of the articles", () => {
  const dataProcessor = new DataProcessor();

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

  dataProcessor.setTemplate(template);

  const returnedJSON = dataProcessor.process(reviewData);

  const expectedJSON = {
    title: "REVIEW: When to use the outcome code “have completed”",
    reviews: [
      "Duck",
      'Sorry, this is useful, but could you maybe suggest a procedure (for the real thing) for if an address is listed as "have completed" but is still coming up on the workload? I\'ve seen too many of these for it to be a random glitch...',
      "That's good to know that the \"have completed\" outcome is meant to remain and isn't a glitch, but at what point, if any, is it appropriate to follow up at these addresses?(probably more relevant in the mandatory census rather than the optional rehearsal)",
      'What is the procedure if the address is still coming up on the workload but it is listed as "have completed" over a week ago?',
    ],
  };

  expect(returnedJSON[0]).toEqual(expectedJSON);
});

test("List individual reviews for a different article", () => {
  const dataProcessor = new DataProcessor();

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

  dataProcessor.setTemplate(template);

  const returnedJSON = dataProcessor.process(reviewData);

  const expectedJSON = {
    title: "REVIEW: How to issue a household UAC",
    reviews: [
      'Perhaps add an option for "receive new HUAC by post". Some people are uncomfortable to give out, or they don\'t know, their mobile number. If you can get a paper questionnaire by post, why not a code?',
      "Sometimes householder doesn't want to give me their mobile phone number. We were told by FSS to telephone the public number in such cases. 08001412021\nI did that this evening while  I was with the householder and guess what : they said they don't give Huac by post.  Only by text �\nSo there's some confusion somewhere!",
    ],
  };

  expect(returnedJSON[1]).toEqual(expectedJSON);
});
