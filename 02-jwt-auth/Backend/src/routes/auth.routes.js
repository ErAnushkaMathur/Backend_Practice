const express = require("express")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userModel = require("../models/user.models")
const authRouter = express.Router()


authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  const isEmailAlreadyExist = await userModel.findOne({ email })

  if (isEmailAlreadyExist) {
    return res.status(409).json({
      message: "With this email account user already exist"
    })
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")
  const user = await userModel.create({ name, email, password : hash })
   const token = jwt.sign(
     {
      id: user._id,
      email:user.email
     },
     process.env.JWT_SECRET
   )
   

   res.cookie("jwt" , token)
  res.status(201).json({
    message: "user registered",
    user,
    token
  })
})

authRouter.post("/protected" ,(req, res)=>{
  console.log(req.cookies);

  res.status(200).json({
    message: "this is a protected route "
  })
})

authRouter.post("/login" , async(req , res)=>{
  const {email , password} = req.body
  const user = await userModel.findOne({email})
  
  if(!user){
    return res.status(404).json({
      message: "user not found "
    })
  }
  const isPasswordMatched =   user.password === crypto.createHash("md5").update(password).digest("hex")
  if(!isPasswordMatched){
    return res.status(401).json({
      message: "password does not match"
    })
  } 
 const token = jwt.sign({
  id : user._id,
  email : user._email
 },
 process.env.JWT_SECRET)

 res.cookie("jwt" , token)
  res.status(200).json({
    message : "user logged in successfully",  
    user,
    token
  })
 

})
module.exports = authRouter