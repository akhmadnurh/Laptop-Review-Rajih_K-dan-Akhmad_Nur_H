var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const { authRouter } = require("./authRoute");
const user = require("./userRoute");

router.use("/", user);
router.use("/", authRouter);

module.exports = router;
