import {articleNode, draftNode, legacyDraftNode} from "../testdata"
const { excludeDraftArticle } = require(`../draft-excluder`)

const readyForProductionNode = {
  frontmatter: {
    title: "ready for production",
    description: "ready for production description",
    priority: 0,
    date: new Date(),
    draftreason: "Ready for production"
  },
  fields: {
    pagename: "ready-for-production",
    collection: "articles"
  }
}

const notReadyForProductionNode = {
  frontmatter: {
    title: "not ready for production",
    description: "not ready for production description",
    priority: 0,
    date: new Date(),
    draftreason: "Something other than ready for production"
  },
  fields: {
    pagename: "not-ready-for-production",
    collection: "articles"
  }
}

describe("excludeDraftArticle without filtering", () => {
  beforeEach(() => {
	  process.env.EXCLUDE_DRAFTS = ""
  });

  it("normal node", () => {
  	expect(excludeDraftArticle(articleNode)).toBe(false)
  })
  it("legacy draft node", () => {
  	expect(excludeDraftArticle(legacyDraftNode)).toBe(false)
  })
  it("ready for production node", () => {
    expect(excludeDraftArticle(readyForProductionNode)).toBe(false)
  })
  it("not ready for production node", () => {
    expect(excludeDraftArticle(notReadyForProductionNode)).toBe(false)
  })
})

describe("excludeDraftArticle with filtering", () => {
  beforeEach(() => {
	  process.env.EXCLUDE_DRAFTS = "true"
  });

  it("normal node", () => {
  	expect(excludeDraftArticle(articleNode)).toBe(false)
  })
  it("legacy draft node", () => {
  	expect(excludeDraftArticle(legacyDraftNode)).toBe(true)
  })
  it("ready for production node", () => {
    expect(excludeDraftArticle(readyForProductionNode)).toBe(false)
  })
  it("not ready for production node", () => {
    expect(excludeDraftArticle(notReadyForProductionNode)).toBe(true)
  })
})