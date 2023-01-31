const jwt = require("jsonwebtoken");

const jwtAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid token." });
      }

      req.user = decoded;

      next();
    });
  }

  return res.status(401).json({ msg: "Unauthorized." });
};

module.exports = { jwtAuth };
