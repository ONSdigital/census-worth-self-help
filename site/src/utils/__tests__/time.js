import { getTimeAgoPublished } from "../time"
const MockDate = require('mockdate');

MockDate.set('2019-02-03');

describe("getTimeAgoPublished", () => {

  it("returns expected text when given a passed date", () => {
  	expect(getTimeAgoPublished("2019-02-02T12:00:00.000Z")).toEqual("12 hours ago")
  })

  it("returns expected text when given a future date", () => {
  	expect(getTimeAgoPublished("2019-02-04T12:00:00.000Z")).toEqual("Just published")
  })
})