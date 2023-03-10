const collectionService=require("../../src/services/collection.service")
const {collection}=require("../../db/models")

describe("Collection Service",()=>{
    it("should return the id of the newly created collection", async()=>{
        jest.spyOn(collection,"create").mockImplementationOnce(()=>{return {id:1}})
        const output=await collectionService.addCollectionService("test","test")
        expect(output).toEqual(1)
    })
    it("should return id and values of the collection with the given content type name", async()=>{
        jest.spyOn(collection,"findAll").mockImplementationOnce(()=>{return [{id:1,values:"test"}]})
        const output=await collectionService.getCollectionService("test")
        expect(output).toEqual([{id:1,values:"test"}])
    })
})