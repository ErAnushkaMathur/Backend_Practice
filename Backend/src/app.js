const express = require('express')
const app = express()
const cors = require("cors")
const path = require('path')

app.use(express.json())
app.use(cors())
app.use(express.static('./public'))
const noteModel = require("./config/Models/notes.model")

//POST API CREATED
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body
  const note = await noteModel.create({
    title, description
  })
  res.status(201).json({
    message: "note created successfully",
    note
  })
})

//Api for fetching data
app.get("/api/notes", async (req, res) => {
  const note = await noteModel.find()
  res.status(200).json({
    message: "Note fetched successfully",
    note
  })

})

//Api deletion
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id
  const note = await noteModel.findByIdAndDelete(id)

  res.status(200).json({
    message: " note deleted successfully",
    note
  })
})

//Api Updation
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id
  const { description } = req.body
  await noteModel.findByIdAndUpdate(id, { description })

  res.status(200).json({
    message: "note updated successfuly"
  })
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})
module.exports = app