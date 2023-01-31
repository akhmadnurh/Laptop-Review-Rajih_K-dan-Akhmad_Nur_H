const express = require("express");
const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");
const { jwtAuth } = require("../middlewares/authMiddleware");
const authRouter = express.Router();

const basePath = "";

authRouter.post(`${basePath}/register`, register);
authRouter.post(`${basePath}/login`, login);
authRouter.patch(`${basePath}/password`, jwtAuth, changePassword);

module.exports = { authRouter };
