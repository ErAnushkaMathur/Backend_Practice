const  express = require('express')
const app = express()

app.use(express.json())
const note = []

app.post('/notes', (req , res)=>{
  note.push(req.body)
  res.send("note created")
  console.log(note);
})

app.get("/notes", (req,res)=>{
  res.send(note)
})

app.delete("/notes/:id" , (req , res)=>{
   delete note[req.params.id]
  console.log("note deleted");
})

app.patch("/notes/:id" , (req , res)=>{
  note[req.params.id].description=req.body.description
  res.send("notes updated successfully")
})
module.exports = app
