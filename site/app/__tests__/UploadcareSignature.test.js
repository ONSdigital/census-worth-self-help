import UploadcareSignature from '../UploadcareSignature'
describe("Uploadcare Signature", () => {
  it("Should instantiate the UploadcareSignature class", () => {
    expect(new UploadcareSignature()).toBeTruthy()
    expect(new UploadcareSignature()).toBeInstanceOf(UploadcareSignature)
  })

  it("Given secret and expire it should generate correct signature", () => {
    const exampleSignature = 'd39a461d41f607338abffee5f31da4d4e46535651c87346e76906bf75c064d47';
    expect(new UploadcareSignature().generate('project_secret_key', '1454903856'))
    .toEqual(exampleSignature)
    expect(new UploadcareSignature()).toBeInstanceOf(UploadcareSignature)
  })
})
