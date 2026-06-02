const mongoose = require("mongoose")

const followSchema = new model.Schema({
  Follower : {
  type : mongoose.Schema.Types.ObjectId,
  ref:"user",
  require : [true , "Follower is require"]
},
  Followee: {
  type : mongoose.Schema.Types.ObjectId,
  ref : "user",
  require : [true , "Followee is required"]
  }
},
{
  timeStamps : true
})

const followModel = mongoose.model("follows" , followSchema)

module.exports = followoModel