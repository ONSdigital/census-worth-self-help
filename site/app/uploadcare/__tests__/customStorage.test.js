import CustomStorage from "../customStorage"

describe("CustomStorage", () => {

    it("can be instantiated", () => {
        expect(new CustomStorage('a','b','c')).toBeTruthy()
    })

    it("generates sane urls", () => {
        const uut = new CustomStorage('a','b','c')
        expect(uut.getUrl("s3://mybucket/x/y.jpg")).toEqual('https://b.s3.c.amazonaws.com/x/y.jpg')
    })

    it("returns the storage id when target is queried", () => {
        const uut = new CustomStorage('a','b','c')
        expect(uut.getTarget()).toEqual('a')
    })
})