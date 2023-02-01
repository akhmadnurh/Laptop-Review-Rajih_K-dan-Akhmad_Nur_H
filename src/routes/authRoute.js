const express = require("express");
const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");
const { userAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

const basePath = "";

router.post(`${basePath}/register`, register);
router.post(`${basePath}/login`, login);
router.patch(`${basePath}/password`, userAuth, changePassword);

module.exports = router;
