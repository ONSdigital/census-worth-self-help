const DataTransform = require("node-json-transform").DataTransform;

class DataProcessor {
  process(data) {
    const processableData = { data };
    if (this.template) {
      if (Object.keys(this.template).length === 0) {
        return [];
      }

      const returnData = DataTransform(processableData, this.template).transform();

      return returnData;
    } else {
      return processableData;
    }
  }
  setTemplate(template) {
    this.template = template;
  }
}

module.exports = DataProcessor;
