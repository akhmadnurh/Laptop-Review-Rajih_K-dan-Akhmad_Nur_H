const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const { authRouter } = require("./authRoute");
const user = require("./userRoute");

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/", user);
router.use("/", authRouter);

module.exports = router;
