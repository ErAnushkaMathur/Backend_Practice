const mongoose = require("mongoose")

function connectToDb(){
 mongoose.connect(process.env.MONGOOSE_URI)
 .then(()=>{
  console.log("Connect to Db");
 })
}

module.exports = connectToDb