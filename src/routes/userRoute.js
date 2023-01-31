const express = require("express");
// Get Module Controller Start

const {
  getProfileById,
  updateProfileDetail,
} = require("../controllers/userController");
const { jwtAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/profile/:id", jwtAuth, getProfileById);
router.post("/profile", jwtAuth, updateProfileDetail);

module.exports = router;
