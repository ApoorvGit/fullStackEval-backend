const contentService=require("../../src/services/content.service")
const {contenttypes}=require("../../db/models")

describe("Content Service",()=>{
    it("it should return all the content types", async()=>{
        jest.spyOn(contentService,"getContentTypesService").mockImplementationOnce(()=>{return [{content_type_name:"test",fields:[]}]})
        const output=await contentService.getContentTypesService()
        expect(output).toEqual([{content_type_name:"test",fields:[]}])
    })
    it("should return the fields of the given content type", async()=>{
        jest.spyOn(contentService,"getFields").mockImplementationOnce(()=>{return {fields:["test"]}})
        const output=await contentService.getFields("test")
        expect(output).toEqual({fields:["test"]})
    })
    it("should call contenttypes.create with the correct arguments", async () => {
        const createMock = jest.spyOn(contenttypes, "create").mockImplementation(() => Promise.resolve())
        const contentTypeName = "My Content Type"
        await contentService.createContentType(contentTypeName)
        expect(createMock).toHaveBeenCalledWith({
            content_type_name: contentTypeName,
            fields: []
        })
        createMock.mockRestore()
    })
})

const { collection } = require("../../db/models")
const {
    getContentTypesService,
    createContentType,
    addField,
    getFields,
    updateContentTypeNameService,
} = require("../../src/services/content.service")

describe("getContentTypesService", () => {
    it("should call contenttypes.findAll with the correct attributes", async () => {
        const findAllMock = jest.spyOn(contenttypes, "findAll").mockImplementation(() => Promise.resolve([]))

        await getContentTypesService()

        expect(findAllMock).toHaveBeenCalledWith({
            attributes: ["content_type_name", "fields"],
        })

        findAllMock.mockRestore()
    })
})

describe("createContentType", () => {
    it("should call contenttypes.create with the correct attributes", async () => {
        const createMock = jest.spyOn(contenttypes, "create").mockImplementation(() => Promise.resolve())

        const contentTypeName = "My Content Type"

        await createContentType(contentTypeName)

        expect(createMock).toHaveBeenCalledWith({
            content_type_name: contentTypeName,
            fields: [],
        })

        createMock.mockRestore()
    })
})

describe("addField", () => {
    it("should call contenttypes.findOne and contenttypes.update with the correct attributes", async () => {
        const findOneMock = jest.spyOn(contenttypes, "findOne").mockImplementation(() => Promise.resolve({ fields: [] }))
        const updateMock = jest.spyOn(contenttypes, "update").mockImplementation(() => Promise.resolve())

        const contentTypeName = "My Content Type"
        const fieldName = "My Field"

        await addField(contentTypeName, fieldName)

        expect(findOneMock).toHaveBeenCalledWith({
            where: {
                content_type_name: contentTypeName,
            },
        })
        expect(updateMock).toHaveBeenCalledWith(
            {
                fields: [fieldName],
            },
            {
                where: {
                    content_type_name: contentTypeName,
                },
            }
        )

        findOneMock.mockRestore()
        updateMock.mockRestore()
    })
})

describe("getFields", () => {
    it("should call contenttypes.findOne with the correct attributes", async () => {
        const findOneMock = jest.spyOn(contenttypes, "findOne").mockImplementation(() => Promise.resolve({ fields: [] }))

        const contentTypeName = "My Content Type"

        await getFields(contentTypeName)

        expect(findOneMock).toHaveBeenCalledWith({
            attributes: ["fields"],
            where: {
                content_type_name: contentTypeName,
            },
        })

        findOneMock.mockRestore()
    })
})

describe("updateContentTypeNameService", () => {
    it("should call contenttypes.update and collection.update with the correct attributes", async () => {
        const contentTypesUpdateMock = jest.spyOn(contenttypes, "update").mockImplementation(() => Promise.resolve())
        const collectionUpdateMock = jest.spyOn(collection, "update").mockImplementation(() => Promise.resolve())

        const oldContentTypeName = "Old Content Type"
        const newContentTypeName = "New Content Type"

        await updateContentTypeNameService(oldContentTypeName, newContentTypeName)

        expect(contentTypesUpdateMock).toHaveBeenCalledWith(
            {
                content_type_name: newContentTypeName,
            },
            {
                where: {
                    content_type_name: oldContentTypeName,
                },
            }
        )
        expect(collectionUpdateMock).toHaveBeenCalledWith(
            {
                content_type_name: newContentTypeName,
            },
            {
                where: {
                    content_type_name: oldContentTypeName,
                },
            }
        )

        contentTypesUpdateMock.mockRestore()
        collectionUpdateMock.mockRestore()
    })
})
