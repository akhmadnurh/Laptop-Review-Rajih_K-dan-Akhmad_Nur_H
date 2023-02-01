const express = require("express");
const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");
const { userAuth } = require("../middlewares/authMiddleware");
const authRouter = express.Router();

const basePath = "";

authRouter.post(`${basePath}/register`, register);
authRouter.post(`${basePath}/login`, login);
authRouter.patch(`${basePath}/password`, userAuth, changePassword);

module.exports = { authRouter };
