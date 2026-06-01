const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
  console.log(req.body, req.file)

  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "token not provided , Unauthorized access"
    })
  }
  let decoded = null
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return res.status(401).json({
      message: "user is unauthorized"
    })
  }

  console.log(decoded);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: "Test",
    folder: "insta-clone"
  })

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id

  })
  res.status(201).json({
    message: "post created successfully",
    post
  })

}

async function getPostCotroller(req, res) {

  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "token not provided"
    })
  }
  let decoded = null
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch (err) {
    return res.status(401).json({
      message: "token is invalid"
    })
  }

  const userId = decoded.id

  const post = await postModel.find({
    user: userId,
  })

  res.status(200).json({
    message: "post fetched successfully",
    post
  })

}

async function getPostDetailsController(req, res) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "token not provided"
    })
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch (err) {
    return res.status(401).json({
      message: "UnAuthorized Access"
    })
  }

  const userId = decoded.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if (!post) {
    return res.status(404).json({
      message: "post not found"
    })
  }

  const isValidUser = post.user.toString() === userId

  if(!isValidUser){
    return res.status(401).json({
      message : " Forbidden Content"
    })
  }
  return res.status(200).json({
    message : "post fetched successfully",
    post
  })
}


module.exports = {
  createPostController,
  getPostCotroller,
  getPostDetailsController,
}