import {articleNode, draftNode} from "../testdata"
const { excludeDraftArticle } = require(`../draft-excluder`)

describe("excludeDraftArticle without filtering", () => {
  beforeEach(() => {
	process.env.EXCLUDE_DRAFTS = ""
  });

  it("normal node", () => {
  	expect(excludeDraftArticle(articleNode)).toBe(false)
  })
  it("draft node", () => {
  	expect(excludeDraftArticle(draftNode)).toBe(false)
  })
})

describe("excludeDraftArticle with filtering", () => {
  beforeEach(() => {
	process.env.EXCLUDE_DRAFTS = "true"
  });

  it("normal node", () => {
  	expect(excludeDraftArticle(articleNode)).toBe(false)
  })
  it("draft node", () => {
  	expect(excludeDraftArticle(draftNode)).toBe(true)
  })
})