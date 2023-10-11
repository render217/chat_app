const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controller/auth.controller");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
module.exports = router;
