const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  name : "String",
  password : "String",
  email : {type : String,
    unique: [true , "with this email account user already exist"]
  },
}) 

const userModel = mongoose.model("users" , userSchema)

module.exports = userModel