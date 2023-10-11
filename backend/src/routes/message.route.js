const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  sendMessage,
} = require("../controller/message.controller");

// router.use(verifyJWT)

router.route("/:chatId").get(getAllMessages).post(sendMessage);
module.exports = router;
