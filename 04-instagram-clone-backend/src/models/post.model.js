const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
  caption:{
       type : String,
       default:""
  },
  imgUrl:{
    type : String,
    // default :   
      required: [true , "imgUrl is required for creating a post"]
  },
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    require : [true , "user id is required for creating a post"]
  }
})

const postModel = mongoose.model("post" , postSchema)

module.exports = postModel