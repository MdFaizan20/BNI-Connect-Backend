const express =require("express")
const router =express.Router()
const  userController = require("../controllers/userController")
const middleware = require("../middleware/auth")

router.post("/register",userController.registration)
router.post("/login",userController.userLogin)

module.exports=router