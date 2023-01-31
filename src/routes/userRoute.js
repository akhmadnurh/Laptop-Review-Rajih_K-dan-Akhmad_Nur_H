const express = require("express");
// Get Module Controller Start
const {
  getProfileById,
  updateProfileDetail,
} = require("../controllers/userController");
const router = express.Router();

const authHeader = require("../middlewares/auth.header");

router.get("/profile/:id", authHeader, getProfileById);
router.post("/profile", authHeader, updateProfileDetail);

module.exports = router;
