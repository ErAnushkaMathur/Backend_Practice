const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
async function loginController (req, res)  {
  const { email, username, password } = req.body
  const user = await userModel.findOne({
    $or: [
      {
        email: email
      },
      {
        username: username
      }
    ]
  }
  )

  if(!user){
    return res.status(404).json({
      message: "username or email is invalid"
    })
  }
  
  const isPasswordValid = await bcrypt.compare(password , user.password)

  if(!isPasswordValid){
    return res.status(401).json({
      message : "password invalid"
    })
  }

  const token = jwt.sign({
    id : user._id
  },process.env.JWT_SECRET,{expiresIn:"1d"})

  res.cookie("token" ,token)

  res.status(200).json({
    message : "user loggedIn successfully",
    user:{
      username : user.username,
      email: user.email,
      bio : user.bio,
      profileImage : user.profileImage
    }
  })
}

async function registerController (req, res)  {
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
  if (isUserExist) {
    return res.status(409).json({
      message: "user already exist  "(isUserExist).email == email ? "email already exist" : "username already exist"
    })
  }

  const hash =await bcrypt.hash(password , 10)
  const user = await userModel.create({
    email, username, password: hash, bio, profileImage
  })

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET, { expiresIn: "1h" })



  res.cookie("token", token)
  res.status(201).json({
    message: "user registered successfully",
    user: {
      emai: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })

}

module.exports = {
  registerController,
  loginController
}

// 04-instagram-clone-backend