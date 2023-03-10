const axios=require("axios")

const requestValidator=async (req, res, next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token)
    const data=await axios.post("http://authserver:5000/token/validation", {"token": token})
    if(!data) return await res.status(404).json({"message": "user not found"})
    next()
}

module.exports={requestValidator}