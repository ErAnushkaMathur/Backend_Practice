const express = require("express")
const UserController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


const userRouter = express.Router() 

/**
 * @route POST /api/user/follow/:userid
 * @description  Follow a user
 * @access Private
 */

userRouter.post("/follow/:username", identifyUser,  UserController.followUserController )

/**
 * @route POST /api/user/unfollow/:userid
 * @description  Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser,  UserController.unfollowUserController
)


module.exports = userRouter