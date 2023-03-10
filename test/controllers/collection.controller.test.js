const collectionController = require("../../src/controllers/collection.controller")
const collectionService = require("../../src/services/collection.service")

describe("collectionController", () => {
    it("should return all collections", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type"
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const collections = [{ id: 1, values: "My Collection" }]
        jest.spyOn(collectionService, "getCollectionService").mockImplementation(() => Promise.resolve(collections))

        await collectionController.getCollection(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(collections)
    })
    it("should add a collection", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type"
            },
            body: {
                values: "My Collection"
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const id = 1
        jest.spyOn(collectionService, "addCollectionService").mockImplementation(() => Promise.resolve(id))

        await collectionController.addCollection(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(id)
    })
    it("should update a collection", async () => {
        const req = {
            params: {
                id: 1
            },
            body: {
                values: "My Collection"
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(collectionService, "updateCollectionService").mockImplementation(() => Promise.resolve())

        await collectionController.updateCollection(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "collection updated" })
    })
    it("should delete a collection", async () => {
        const req = {
            params: {
                id: 1
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(collectionService, "deleteCollectionService").mockImplementation(() => Promise.resolve())

        await collectionController.deleteCollection(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "collection deleted" })
    })
    it("should return an error", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type"
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(collectionService, "getCollectionService").mockImplementation(() => Promise.reject())

        await collectionController.getCollection(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" })
    })
    it("should return an error", async () => {
        const req = {
            params: {
                contentTypeName: "My Content Type"
            },
            body: {
                values: "My Collection"
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(collectionService, "addCollectionService").mockImplementation(() => Promise.reject())

        await collectionController.addCollection(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" })
    })
})