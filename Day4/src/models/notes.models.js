const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: String,
  description: String
})

// post /notes
// req.body => {title,description}


const noteModel = mongoose.model("notes", noteSchema)
module.exports = noteModel