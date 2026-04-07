const mongoose = require('mongoose')


function connectToDb(){
 mongoose.connect("mongodb+srv://AnushkaMathur:HBSgJbLynILurrWy@cluster0.xhjdfbc.mongodb.net/")
 .then(()=>{
  console.log("connected to DB");
 })
} 

module.exports = connectToDb