const express = require('express')
const authRouter = express.Router()
const userModel = require("../models/user.model")

authRouter.post("/register" , async(req, res)=>{
  const{email , name , password} = req.body
  const user = await userModel.create({
    email , name , password })
    res.status(201).json({
      message : "user registered successfully",
      user
    })
})
module.exports = authRouter