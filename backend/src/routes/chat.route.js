const express = require("express");
const router = express.Router();
const {
  getAllChats,
  addNewParticipantInGroupChat,
  createAGroupChat,
  createOrGetAOneOnOneChat,
  deleteGroupChat,
  deleteOneOnOneChat,
  getAllAvaliableGroupChat,
  getGroupChatDetails,
  joinGroupChat,
  leaveGroupChat,
  removeParticipantFromGroupChat,
  searchAvaliableUsers,
  updateGroupChat,
} = require("../controller/chat.controller");

// router.use(verifyJWT)
router.route("/").get(getAllChats);

router.route("/users").get(searchAvaliableUsers);

router.route("/single/:receiverId").post(createOrGetAOneOnOneChat);

router.route("/group").get(getAllAvaliableGroupChat).post(createAGroupChat);

router
  .route("/group/:chatId")
  .get(getGroupChatDetails)
  .patch(updateGroupChat)
  .post(joinGroupChat)
  .delete(leaveGroupChat);

// admin can add and remove
router
  .route("/group/:chatId/:participantId")
  .post(addNewParticipantInGroupChat)
  .delete(removeParticipantFromGroupChat);

// router.route("/leave/group/:chatId").delete(leaveGroupChat);

// remove group chat OR 1-1 chat
router.route("/remove/group/:chatId").delete(deleteGroupChat);
router.route("/remove/single/:chatId").delete(deleteOneOnOneChat);

module.exports = router;
