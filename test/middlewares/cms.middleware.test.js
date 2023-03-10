const cmsMiddleware = require("../../src/middlewares/cms.middleware")

describe(" CMS Middleware", () => {
    it("should return 400 if content type name is not provided", async () => {
        const req = {
            params: {},
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        const next = jest.fn()

        await cmsMiddleware.contentTypeValidator(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: "\"contentTypeName\" is required" })
    })
    it("should return 400 if field name is not provided", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type",
            },
            body: {},
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        const next = jest.fn()

        await cmsMiddleware.fieldValidator(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: "\"fieldName\" is required" })
    })
    it("should return 400 if collection id is not provided", async () => {
        const req = {
            params: {},
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        const next = jest.fn()

        await cmsMiddleware.collectionIdValidator(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: "\"id\" is required" })
    })
    it("should call next if content type name is provided", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type",
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        const next = jest.fn()

        await cmsMiddleware.contentTypeValidator(req, res, next)

        expect(next).toHaveBeenCalled()
    })
    it("should call next if field name is provided", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type",
            },
            body: {
                fieldName: "test",
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        const next = jest.fn()

        await cmsMiddleware.fieldValidator(req, res, next)

        expect(next).toHaveBeenCalled()
    })
})