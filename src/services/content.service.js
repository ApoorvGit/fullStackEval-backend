const { contenttypes }=require("../../db/models")
const {collection}=require("../../db/models")

const getContentTypesService=async ()=>{
    const contentTypes=await contenttypes.findAll({
        attributes:["content_type_name", "fields"]
    })
    return contentTypes
}

const createContentType=async (contentTypeName)=>{
    await contenttypes.create({
        content_type_name:contentTypeName,
        fields:[]
    })
}

const addField=async (contentTypeName,fieldName)=>{
    const contentType=await contenttypes.findOne({
        where:{
            content_type_name:contentTypeName
        }
    })
    const fields=contentType.fields
    console.log(typeof(fields))
    fields.push(fieldName)
    await contenttypes.update({
        fields:fields
    },{
        where:{
            content_type_name:contentTypeName
        }
    })
}

const getFields=async (contentTypeName)=>{
    const fields = await contenttypes.findOne({
        attributes:["fields"],
        where:{
            content_type_name:contentTypeName
        }
    })
    return fields
}
const updateContentTypeNameService=async (oldContentTypeName,newContentTypeName)=>{
    await contenttypes.update({
        content_type_name:newContentTypeName
    },{
        where:{
            content_type_name:oldContentTypeName
        }
    })
    await collection.update({
        content_type_name:newContentTypeName
    },{
        where:{
            content_type_name:oldContentTypeName
        }
    })
}
const deleteFieldService=async (contentTypeName,fieldName)=>{
    const contentType=await contenttypes.findOne({
        where:{
            content_type_name:contentTypeName
        }
    })
    const fields=contentType.fields
    const index=fields.indexOf(fieldName)
    fields.splice(index,1)
    await contenttypes.update({
        fields:fields
    },{
        where:{
            content_type_name:contentTypeName
        }
    })
    //also key value pair in values of collection with key as fieldname should be deleted and content_type_name is contentTypeName
    const collections=await collection.findAll({
        where:{
            content_type_name:contentTypeName
        }
    })
    for(let i=0;i<collections.length;i++){
        //i think values is a stringified json object
        const values=JSON.parse(collections[i].values)
        console.log(values)
        //deleting not working 
        delete values[fieldName]
        console.log(values)
        await collection.update({
            values:JSON.stringify(values)
        },{
            where:{
                id:collections[i].id
            }
        })
    }

}

module.exports={getContentTypesService, createContentType, addField, getFields, updateContentTypeNameService, deleteFieldService}