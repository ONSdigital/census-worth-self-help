process.env.GATSBY_ASSETS_PATH = "test"

import { transformSources, htmlSanitize } from "../contenttransforms"

describe("transformSources", () => {

  it("replaces paths", () => {
  	expect(transformSources("wibble {{TARGET_ASSETS_SRC}} wibble")).toEqual("wibble test wibble")
  })

  it("doesn't alter html without tags", () => {
  	expect(transformSources("wibble flibble wibble")).toEqual("wibble flibble wibble")
  })
})

describe("htmlSanitize", () => {

  it("no alteration to plain string", () => {
  	expect(htmlSanitize("this is my very normal string")).toEqual("this is my very normal string")
  })

  it("no alteration to string containing allowed elements", () => {
  	expect(htmlSanitize('<h1>Hi</h1><b>bold</b><blockquote>bq</blockquote>')).toEqual("<h1>Hi</h1><b>bold</b><blockquote>bq</blockquote>")
  })

  it("no alteration to images, video or audio", () => {
  	expect(htmlSanitize('<video controls><source src="/my-video.mp4" type="video/mp4">msg</video>'))
  		.toEqual('<video controls><source src="/my-video.mp4" type="video/mp4"></source>msg</video>')

  	expect(htmlSanitize('<audio controls><source src="/my-audio.mp3" type="audio/mp3">msg</audio>'))
  		.toEqual('<audio controls><source src="/my-audio.mp3" type="audio/mp3"></source>msg</audio>')

  	expect(htmlSanitize('<img src="/test" />'))
  		.toEqual('<img src="/test" />')
  })

  it("dissallowed tags", () => {
  	expect(htmlSanitize("hi <script>alert('xss');</script> hi")).toEqual("hi  hi")

  	expect(htmlSanitize("made up:<wibble>wibble</wibble>")).toEqual("made up:wibble")

  	expect(htmlSanitize("<b onmouseover=alert(‘attribute attack‘)>hi</b>")).toEqual("<b>hi</b>")

    expect(htmlSanitize('test<IFRAME SRC=# onmouseover="alert(\'XSS!\')"></IFRAME>')).toEqual("test")
  })
})