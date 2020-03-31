process.env.GATSBY_ASSETS_PATH = "test"

import {
  transformSources,
  htmlSanitize,
  getSiteSpecificStyle
} from "../contenttransforms"

describe("getSiteSpecificStyle", () => {
  it("gets a specific banner colour based on an environment variable", () => {
    expect(getSiteSpecificStyle().colour).toEqual("rgb(144, 32, 130)")

    const originalEnvValue = process.env.GATSBY_SITE_COLOUR

    process.env.GATSBY_SITE_COLOUR = "secondary"
    expect(getSiteSpecificStyle().colour).toEqual("rgb(60, 56, 142)")
    process.env.GATSBY_SITE_COLOUR = "tertiary"
    expect(getSiteSpecificStyle().colour).toEqual("rgb(0, 163, 166)")

    process.env.GATSBY_SITE_COLOUR = "unknown"
    expect(getSiteSpecificStyle().colour).toEqual("rgb(144, 32, 130)")

    process.env.GATSBY_SITE_COLOUR = originalEnvValue
  })
})

describe("transformSources", () => {
  it("replaces paths", () => {
    expect(transformSources("wibble {{TARGET_ASSETS_SRC}} wibble")).toEqual(
      "wibble test wibble"
    )
  })

  it("doesn't alter html without tags", () => {
    expect(transformSources("wibble flibble wibble")).toEqual(
      "wibble flibble wibble"
    )
  })
})

describe("htmlSanitize", () => {
  it("no alteration to plain string", () => {
    expect(htmlSanitize("this is my very normal string")).toEqual(
      "this is my very normal string"
    )
  })

  it("no alteration to string containing allowed elements", () => {
    expect(
      htmlSanitize("<h1>Hi</h1><b>bold</b><blockquote>bq</blockquote>")
    ).toEqual("<h1>Hi</h1><b>bold</b><blockquote>bq</blockquote>")
  })

  it("no alteration to images, video or audio", () => {
    expect(
      htmlSanitize(
        '<video controls><source src="/my-video.mp4" type="video/mp4">msg</video>'
      )
    ).toEqual(
      '<video controls><source src="/my-video.mp4" type="video/mp4"></source>msg</video>'
    )

    expect(
      htmlSanitize(
        '<audio controls><source src="/my-audio.mp3" type="audio/mp3">msg</audio>'
      )
    ).toEqual(
      '<audio controls><source src="/my-audio.mp3" type="audio/mp3"></source>msg</audio>'
    )

    expect(htmlSanitize('<img src="/test" />')).toEqual('<img src="/test" />')
  })

  it("dissallowed tags", () => {
    expect(htmlSanitize("hi <script>alert('xss');</script> hi")).toEqual(
      "hi  hi"
    )

    expect(htmlSanitize("made up:<wibble>wibble</wibble>")).toEqual(
      "made up:wibble"
    )

    expect(
      htmlSanitize("<b onmouseover=alert(‘attribute attack‘)>hi</b>")
    ).toEqual("<b>hi</b>")

    expect(
      htmlSanitize("test<IFRAME SRC=# onmouseover=\"alert('XSS!')\"></IFRAME>")
    ).toEqual("test")
  })
})
