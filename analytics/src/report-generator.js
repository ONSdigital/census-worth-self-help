const fs = require("fs");
const path = require("path");
class ReportGenerator {
  constructor(outpath) {
    this.outpath = outpath;
  }
  generate(filename, filedata) {
    const data = this.jsonToCSV(filedata);

    if (this.outputFolderExists()) {
      fs.writeFileSync(path.join(this.outpath, filename), data);
    } else {
      fs.mkdirSync(this.outpath);
      if (this.outputFolderExists()) {
        fs.writeFileSync(path.join(this.outpath, filename), data);
      }
    }
    return data;
  }

  previousDay(date) {
    return date.getDate() - 1;
  }

  getReportDateString() {
    const date = new Date();
    const yesterday = this.previousDay(date);
    date.setDate(yesterday);

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${dayOfMonth}`;
  }

  jsonToCSV(jsonArrayIn) {
    const outLines = [];
    const dateString = this.getReportDateString();

    outLines.push(`"Article Title","Review content","Date"`);
    jsonArrayIn.map((review, j) => {
      if (review) {
        let reviewsExist = review.reviews.length > 0;
        if (reviewsExist && review.title.includes("REVIEW")) {
          review.reviews.map((feedback, i) => {
            const sanitizedFeedback = this.sanitize(feedback);
            outLines.push(
              i === 0
                ? `"${review.title}","${sanitizedFeedback}","${dateString}"`
                : `,"${sanitizedFeedback}","${dateString}"`
            );
          });
        }
      }
    });
    return outLines.join("\n");
  }

  sanitize(input) {
    return input.replace(/"/g, `""`);
  }

  getPath() {
    return this.outpath;
  }

  outputFolderExists() {
    return fs.existsSync(this.outpath);
  }
}
module.exports = ReportGenerator;
