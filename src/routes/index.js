var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const user = require("./user");

router.use("/user", user);

module.exports = router;
