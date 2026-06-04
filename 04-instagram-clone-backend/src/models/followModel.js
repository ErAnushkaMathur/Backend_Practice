const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
  Follower : {
  type : "String",
},
  Followee: {
  type : "String",
  }
},
{
  timestamps : true
})

const followModel = mongoose.model("follows" , followSchema)

module.exports = followModel