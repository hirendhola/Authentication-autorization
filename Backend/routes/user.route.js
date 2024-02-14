const express = require("express")
const checkIfUserExists = require("../middlewares/checkIfUserExists.middleware")
const { signup, login, getUser, refreshToken, logout} = require("../controllers/user.controller.js")
const { verifyToken } = require("../middlewares/verifyToken.middleware.js")

const router = express.Router()
router.post("/signup", checkIfUserExists, signup) //signup
router.post("/login", checkIfUserExists, login) //login
router.post("/logout", logout) //login
router.get("/user", verifyToken, getUser) //getuser
router.get("/refresh", refreshToken) //getuser


module.exports = router
