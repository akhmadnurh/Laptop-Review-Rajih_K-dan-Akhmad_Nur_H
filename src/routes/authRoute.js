const express = require("express");
const { register, login } = require("../controllers/authController");
const authRouter = express.Router();

const basePath = "";

authRouter.post(`${basePath}/register`, register);
authRouter.post(`${basePath}/login`, login);

module.exports = { authRouter };
