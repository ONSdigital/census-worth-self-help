import UploadcareSignature from '../signature'

describe("signature", () => {

    it("can be instantiated", () => {
        const sig = new UploadcareSignature('someSecret')
        expect(sig).toBeTruthy()
        expect(sig).toBeInstanceOf(UploadcareSignature)

    })

    it("generates a signature", () => {
        const date = new Date()
        const sig = new UploadcareSignature('someSecret')
        
        expect(sig.generate(date)).toBeTruthy()
    })

    it("it should generate correct signature", () => {
        const exampleSignature = 'd39a461d41f607338abffee5f31da4d4e46535651c87346e76906bf75c064d47';
        const sig = new UploadcareSignature('project_secret_key')
        expect(sig.generate('1454903856')).toEqual(exampleSignature)
      })
})
