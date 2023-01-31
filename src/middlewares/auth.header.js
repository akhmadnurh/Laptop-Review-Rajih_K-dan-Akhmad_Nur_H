const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const response = new Response(res);

  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(400).json(response.Unauthorized, "Authentication Needed");

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    const errorList = ["JsonWebTokenError", "TokenExpiredError"];
    errorList.includes(err.name)
      ? res.status(400)(response.BadRequest, err.message)
      : res.status(400)(response.InternalServerError, "internal server error");
  }
};
