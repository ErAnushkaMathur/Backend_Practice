const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const authController = require("../controllers/auth.controller")

authRouter.post("/register", authController.registerController )

authRouter.post("/login", authController.loginController)
module.exports = authRouter