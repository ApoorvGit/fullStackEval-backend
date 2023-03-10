const contentService=require("../services/content.service")

const getContentTypes=async (req,res)=>{
    try{
        const contentTypes=await contentService.getContentTypesService()
        res.status(200).json(contentTypes)
    }catch (err){
        res.status(400).json({message:err.message})
    }
}

const createContentType=async (req,res)=>{
    try{
        const contentTypeName=req.params.contentTypeName
        await contentService.createContentType(contentTypeName)
        res.status(200).json({message:"create content type"})
    }catch (err){
        res.status(400).json({message:err.message})
    }
}

const addField=(req,res)=>{
    try{
        const contentTypeName=req.params.contentTypeName
        const fieldName=req.body.fieldName
        contentService.addField(contentTypeName,fieldName)
        res.status(200).json({message:"field added"})
    }catch (err){
        res.status(400).json({message:err.message})
    }
}

const getFields=async (req,res)=>{
    try{
        const contentTypeName=req.params.contentTypeName
        const fields=await contentService.getFields(contentTypeName)
        res.status(200).json(fields)
    }catch (err){
        res.status(400).json({message:err.message})
    }
}
const updateContentTypeName=async (req,res)=>{
    try{
        const oldContentTypeName=req.params.contentTypeName
        const newContentTypeName=req.body.contentTypeName
        await contentService.updateContentTypeNameService(oldContentTypeName,newContentTypeName)
        res.status(200).json({message:"content type name updated"})
    }catch (err){
        res.status(400).json({message:err.message})
    }
}

const deleteField=async (req,res)=>{
    try{
        const contentTypeName=req.params.contentTypeName
        const fieldName=req.body.fieldName
        console.log(contentTypeName,fieldName)
        await contentService.deleteFieldService(contentTypeName,fieldName)
        res.status(200).json({message:"field deleted"})
    }catch (err){
        res.status(400).json({message:err.message})
    }
}
module.exports={getContentTypes, createContentType, addField, getFields, updateContentTypeName, deleteField}