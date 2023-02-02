const express = require("express");
// Get Module Controller Start

const {
  getProfileById,
  updateProfileDetail,
} = require("../controllers/userController");
const { userAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/profile", userAuth, getProfileById);
router.post("/profile", userAuth, updateProfileDetail);

module.exports = router;
