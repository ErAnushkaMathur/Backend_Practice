const express = require("express")
const authRouter = express.Router()
const crypto = require('crypto');
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.Model")

authRouter.post("/register" , async(req , res)=>{
  const {email , name , password} = req.body

  const isEmailExist = await userModel.findOne({email})

  if (isEmailExist){
   return res.status(409).json({
    message: "user already exist"
   })
  }
  const user = await userModel.create({
      name ,
      email,
      password : crypto.createHash("sha256").update(password).digest("hex")
    })
  const token = jwt.sign({
    id: user._id,
  },process.env.JWT_SECRET,{expiresIn :"1h"})

  res.cookie("token" , token)
 
  res.status(201).json({
    message: "user registered successfully",
    user: {
      name : user.name,
      email : user.email,
    }
  })

})

authRouter.get("/get-me" , async(req , res)=>{
  const token = req.cookies.token
  const decoded = jwt.verify(token , process.env.JWT_SECRET)
  console.log(decoded)


  const user = await userModel.findById(decoded.id)
   res.status(200).json({
    message: "User fetched",
    decoded
  })
})

authRouter.post("/login" , async(req , res)=>{
  const {email , password} = req.body

  user = await userModel.findOne({email})

  if(! user){
    return res.status(404).json({
      message : "user not found"
    })
  }
 const hash = crypto.createHash("sha256").update(password).digest("hex")
  const isPaasswordMatched = user.password === hash

  if(! isPaasswordMatched){
    return res.status(401).json({
      message: "password not matched"
    })
  }

  const token = jwt.sign({
    id : user._id
  } , process.env.JWT_SECRET , {expiresIn : "1h"})

  res.cookie("token" , token)

  res.json({
    message : "use loggen in successfully",
    name : user.name,
    email : user.email
  })
})
module.exports = authRouter

