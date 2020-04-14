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
    label: "REVIEW: Ullamco labore do reprehenderit cillum do ullamco laborum ad quis exercitation deserunt in. “lorem”",
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
    title: "REVIEW: Ullamco labore do reprehenderit cillum do ullamco laborum ad quis exercitation deserunt in. “lorem”",
    reviews: [
      "Duck",
      'Et veniam ea commodo consectetur.',
      "Non aute laboris et laboris consequat cupidatat consectetur ipsum ea Lorem voluptate sint laboris aliqua.",
      'Consectetur exercitation anim ex consequat ut consequat."lorem" Sint excepteur sunt nulla excepteur duis nostrud dolore magna occaecat amet?',
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
    title: "REVIEW: Pariatur consequat ad consequat aliqua ex non voluptate.",
    reviews: [
      'Exercitation ex velit elit magna. "Quis laboris dolor nulla nulla ex anim incididunt excepteur laboris do Lorem sunt id et.". Incididunt nisi quis ut adipisicing quis aliqua consequat pariatur in ea ad minim.?',
      "Consectetur qui veniam\n quis enim deserunt nostrud cillum mollit ut minim.",
    ],
  };

  expect(returnedJSON[1]).toEqual(expectedJSON);
});
