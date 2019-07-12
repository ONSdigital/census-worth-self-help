process.env.GATSBY_ASSETS_PATH = "test"

import { transformSources } from "../sourcetransforms"

describe("transformSources", () => {

  it("replaces paths", () => {
  	expect(transformSources("wibble {{TARGET_ASSETS_SRC}} wibble")).toEqual("wibble test wibble")
  })

  it("doesn't alter html without tags", () => {
  	expect(transformSources("wibble flibble wibble")).toEqual("wibble flibble wibble")
  })
})