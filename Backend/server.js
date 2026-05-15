require('dotenv').config()
const cors = require("cors")
const app = require('./src/app')
const connectToDb = require("./src/config/database")


connectToDb()
app.listen(3000, (req,res)=>{
  console.log("Server is runing on port 3000");
})

