const express = require("express");
const { UserController } = require("../../controllers/index");

const userRoutes = require("./users-routes");


const router = express.Router();

router.post("/signin", UserController.signinUser);
// router.use("/forgot-password",);


router.use("/users", userRoutes);

module.exports = router;