const express = require("express")
const userModel = require("../routes/auth.routes")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

authRouter.post("/register", async (req, res) => {
  const { email, username, password, bio, profileImage } = req.body

  // const isUserExistByEmail = await  userModel.findOne({email})
  // if(isUserExistByEmail){
  //   return res.status(409).json({
  //     message : "email already exist"
  //   })
  // }

  // const isUserExistByUsername = await userModel.findOne({username})
  // if(isUserExistByUsername){
  //   return res.status(409).json({
  //     message : "username already exist"
  //   })
  // }

  const isUserExist = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })
  if (isUserExist){
   return res.status(409).json({
    message : "user already exist" + (isUserExist).email == email ? "email already exist" : "username already exist"
   })
  }
 
  const hash = crypto.createHash("sha256").update(password).digest("hex")
  const user = await userModel.create({
    email , username , password : hash , bio , profileImage
  })

  const token = jwt.sign({
    id : user._id,
  } ,process.env.JWT_SECRET,{expiresIn :"1h"})



res.cookie("token" , token)
res.status(201).json({
  message: "user registered successfully",
  user:{
    emai: user.email,
    username : user.username,
    bio : user.bio,
    profileImage : user.profileImage
  }
})

})

module.exports = authRouter