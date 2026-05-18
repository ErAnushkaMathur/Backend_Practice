const express = require("express")
const jwt = require("jsonwebtoken")

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
  const user = await userModel.create({ name, email, password })
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


module.exports = authRouter