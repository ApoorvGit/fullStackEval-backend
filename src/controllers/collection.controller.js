const collectionService = require("../services/collection.service")

const getCollection= async (req,res)=>{
    try{
        const contentTypeName=req.params.contentTypeName
        const collections=await collectionService.getCollectionService(contentTypeName)
        res.status(200).json(collections)
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}
const addCollection=async (req,res)=>{
    try{
        const contentTypeName=req.params.contentTypeName
        const collection=req.body
        const collectionString= JSON.stringify(collection)
        const id = await collectionService.addCollectionService(contentTypeName,collectionString)
        res.status(200).json(id)
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}
const updateCollection=async (req,res)=>{
    try{
        const id=req.params.id
        const collection=req.body
        const collectionString=JSON.stringify(collection)
        await collectionService.updateCollectionService(id,collectionString)
        res.status(200).json({message:"collection updated"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}
const deleteCollection=async (req,res)=>{
    try{
        const id=req.params.id
        await collectionService.deleteCollectionService(id)
        res.status(200).json({message:"collection deleted"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports={getCollection, addCollection, updateCollection, deleteCollection}