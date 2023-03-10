const {collection}=require("../../db/models")

const addCollectionService=async (contentTypeName,collectionString)=>{
    const output = await collection.create({
        content_type_name:contentTypeName,
        values:collectionString
    })
    return output.id
}
const getCollectionService=async (contentTypeName)=>{
    const collections=await collection.findAll({
        attributes:["id","values"],
        where:{
            content_type_name:contentTypeName
        }
    })
    return collections
}
const updateCollectionService=async (id,collectionString)=>{
    await collection.update({
        values:collectionString
    },{
        where:{
            id:id
        }
    })
}
const deleteCollectionService=async (id)=>{
    await collection.destroy({
        where:{
            id:id
        }
    })
}
module.exports={addCollectionService, getCollectionService, updateCollectionService, deleteCollectionService}

