const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
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
  } else {
    return res.status(401).json({ msg: "Unauthorized." });
  }
};

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid token." });
      }
      req.user = decoded;
      if (req.user.role === "admin") {
        next();
      } else {
        return res
          .status(401)
          .json({ msg: "Unauthorized. Only admin can use the feature." });
      }
    });
  } else {
    return res.status(401).json({ msg: "Unauthorized." });
  }
};

module.exports = { userAuth, adminAuth };
