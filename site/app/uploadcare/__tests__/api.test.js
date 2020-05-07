import UploadcareApi from "../api"

describe("Uploadcare API", () => {
    it("can be instantiated", () => {
        expect(new UploadcareApi('pubkey','privkey')).toBeTruthy()
    })

    it("generates a valid Uploadcare.Simple authorization", () => {
        const api = new UploadcareApi('pubkey','privkey')
        expect(api.createSimpleAuthorization()).toEqual('Uploadcare.Simple pubkey:privkey')
    })

    
})