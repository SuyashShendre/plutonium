const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const jwt = require("../middlewares/auth")

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

router.get("/users/:userId", jwt.jwtvalidation, userController.getUserData)

router.put("/users/:userId", jwt.jwtvalidation, userController.updateUser)

router.delete("/users/:userId", jwt.jwtvalidation, userController.deleteUser)

module.exports = router;