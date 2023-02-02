const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const {
  getMessage,
  getMessageByReceiverId,
  sendMessage,
  deleteMessage,
} = require("../controllers/messageController");
const router = express.Router();
const basePath = "/message";

router.get(`${basePath}`, userAuth, getMessage);
router.get(
  `${basePath}/receiver/:receiverId`,
  userAuth,
  getMessageByReceiverId
);
router.post(`${basePath}/receiver/:receiverId`, userAuth, sendMessage);
router.delete(`${basePath}/:messageId`, userAuth, deleteMessage);

module.exports = router;
