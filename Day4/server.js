//To connect server and DB  
const app = require('./src/app')
const mongoose = require('mongoose')
const connectToDb = require('./src/config/database')


connectToDb()

app.listen(3000, ()=>{
  console.log("server on");
})
