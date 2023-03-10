const express = require("express")
const app = express()
const port = 8000
const router = require("./routers/cms.route.js")
const cors= require("cors")

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use("/",router)
 
app.listen(port, () => {
    console.log(`cms backend listening on port ${port}`)
})