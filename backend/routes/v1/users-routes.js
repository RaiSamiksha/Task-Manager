const express = require("express");
const { UserController } = require("../../controllers/index");

const router = express.Router();

console.log("UserController", UserController);

router.post("/signup", UserController.signupUser);

module.exports = router;
