const schemas=require("./schemas")

//validators
const contentTypeValidator=(req,res,next)=>{
    const {error}=schemas.contentTypeSchema.validate(req.params)
    if(error){
        return res.status(400).json({"message":error.message})
    }
    next()
}
const fieldValidator=(req,res,next)=>{
    const {error}=schemas.fieldSchema.validate({contentTypeName:req.params.contentTypeName, fieldName: req.body.fieldName})
    if(error){
        return res.status(400).json({"message":error.message})
    }
    next()
}
const collectionIdValidator=(req,res,next)=>{
    const {error}=schemas.collectionSchema.validate(req.params)
    if(error){
        return res.status(400).json({"message":error.message})
    }
    next()
}

module.exports={contentTypeValidator, fieldValidator, collectionIdValidator}