const express = require("express");
const { UserController } = require("../../controllers/index");

const router = express.Router();

console.log("UserController", UserController);

router.post("/users/signup", UserController.signupUser);
router.post("/users/signin", UserController.signinUser);

module.exports = router;
