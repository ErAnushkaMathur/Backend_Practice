const express = require("express")
const postRouter =  express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage : multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")


postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

postRouter.get("/",identifyUser,postController.getPostCotroller)

/**
 * @route POST/api/posts/details/:postId
 * @description get a post details with the id provided in the request params.
 */

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)


/**
 * @route POST/api/posts/like/:postId
 * @description like a post with the id provided in the request params.
 */

postRouter.post("/like/:postId" , identifyUser, postController.likePostController)

module.exports = postRouter