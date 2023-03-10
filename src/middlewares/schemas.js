const joi=require("joi")

const contentTypeSchema=joi.object({
    contentTypeName:joi.string().required()
})
const fieldSchema=joi.object({
    contentTypeName:joi.string().required(),
    fieldName:joi.string().required()
})
const collectionSchema=joi.object({
    id: joi.number().required()
})

module.exports={contentTypeSchema, fieldSchema, collectionSchema}