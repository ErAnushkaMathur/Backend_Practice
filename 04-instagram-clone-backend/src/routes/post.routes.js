const express = require("express")
const postRouter =  express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage : multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

postRouter.get("/",identifyUser,postController.getPostCotroller)

postRouter.get("/details/:postId",identifyUser,postController,identifyUse,getPostDetailsController)
module.exports = postRouter