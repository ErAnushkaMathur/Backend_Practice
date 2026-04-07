const express = require('express')
const app = express()

const noteModel = require('./models/notes.models')
const { model } = require('mongoose')
app.use(express.json())


app.post("/notes" , async(req,res)=>{
  const {title , description} = req.body
  const note = await noteModel.create({
    title, description
  })
  res.status(201).json({
    message: "note created",
    note
  })
})
module.exports = app

