const express = require("express")
const router =express.Router()


const controller =require("../controller/userController")
const midd= require("../middleware/auth")


router.post("/userss",controller.Creation)

router.post("/login",controller.userLogin)
router.get("/user",midd.authentication,controller.getUsers)
router.get("/user/:userId",controller.getUserById)
router.put("/user/:userId",controller.updateUser)
router.delete("/user/:userId",controller.userDeletionById)

module.exports = router    