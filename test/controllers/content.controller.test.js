const contentController = require("../../src/controllers/content.controller")
const contentService = require("../../src/services/content.service")

describe("contentController", () => {
    it("should return all content types", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type",
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        const contentTypes = [{ content_type_name: "test", fields: [] }]
        jest.spyOn(contentService, "getContentTypesService").mockImplementation(() => Promise.resolve(contentTypes))

        await contentController.getContentTypes(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(contentTypes)
    })
    it("should return the fields of the given content type", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type",
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        const fields = { fields: ["test"] }
        jest.spyOn(contentService, "getFields").mockImplementation(() => Promise.resolve(fields))

        await contentController.getFields(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(fields)
    })
    it("should create a new content type", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type",
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        jest.spyOn(contentService, "createContentType").mockImplementation(() => Promise.resolve())

        await contentController.createContentType(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "create content type" })
    })
    it("should add a new field to the given content type", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type",
            },
            body: {
                fieldName: "test",
                fieldType: "test",
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        jest.spyOn(contentService, "addField").mockImplementation(() => Promise.resolve())

        await contentController.addField(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "field added" })
    })
    it("should update the name of the given content type", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type",
            },
            body: {
                contentTypeName: "My New Content Type",
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        jest.spyOn(contentService, "updateContentTypeNameService").mockImplementation(() => Promise.resolve())

        await contentController.updateContentTypeName(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "content type name updated" })
    })
})
