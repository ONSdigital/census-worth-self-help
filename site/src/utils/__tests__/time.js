import { getTimeAgoPublished, LastVisitManager } from "../time"
const MockDate = require('mockdate');
const moment = require("moment")

import { articleList } from "../testdata"

MockDate.set('2019-02-03');

describe("getTimeAgoPublished", () => {

  it("returns expected text when given a passed date", () => {
  	expect(getTimeAgoPublished("2019-02-02T12:00:00.000Z")).toEqual("12 hours ago")
  })

  it("returns expected text when given a future date", () => {
  	expect(getTimeAgoPublished("2019-02-04T12:00:00.000Z")).toEqual("Just published")
  })
})


describe("LastVisitManager", () => {
  beforeEach(() => {
    localStorage.clear()
  });

  it("Ive never been to the site before, lastvisit time = epoch", () => {
  	let lastVisitManager = new LastVisitManager()
	lastVisitManager.updateVisitTime()
	expect(localStorage.getItem("currentVisitTime")).toEqual(moment('2019-02-03').format())
	expect(localStorage.getItem("lastVisitTime")).toEqual(null)
  })

  it("I visit the site again within the gap, current time updates but last visit doesnt", () => {

  	let now = moment()

  	let lastVisitManager = new LastVisitManager()
	lastVisitManager.updateVisitTime()

	now = now.add(10, 'minute')
	MockDate.set(now)

	lastVisitManager.updateVisitTime()

	expect(localStorage.getItem("currentVisitTime")).toEqual(now.format())
	expect(localStorage.getItem("lastVisitTime")).toEqual(null)

  })

  it("I visit the site again outside the gap, current time update and last visit will update ", () => {
  	let old_now = moment()

  	let lastVisitManager = new LastVisitManager()
	lastVisitManager.updateVisitTime()

	let new_now = moment().add(20, 'minute')
	MockDate.set(new_now)

	lastVisitManager.updateVisitTime()

	expect(localStorage.getItem("currentVisitTime")).toEqual(new_now.format())
	expect(localStorage.getItem("lastVisitTime")).toEqual(old_now.format())
  })

  it("filter edge list", () => {
  	let now = moment()

  	let oldDate = moment().subtract(1, 'hour')

  	articleList.edges.forEach(({node}) => node.frontmatter.date = oldDate.format())
  	articleList.edges[1].node.frontmatter.date = now.format()
  	articleList.edges[3].node.frontmatter.date = now.format()

	localStorage.setItem("currentVisitTime", now.format())
	localStorage.setItem("lastVisitTime", moment().subtract(10, 'minute').format())

  	let lastVisitManager = new LastVisitManager()
	let filteredEdges = lastVisitManager.getEdgesChangedSinceLastVist(articleList.edges)

	expect(filteredEdges.length).toEqual(2)
  })
})