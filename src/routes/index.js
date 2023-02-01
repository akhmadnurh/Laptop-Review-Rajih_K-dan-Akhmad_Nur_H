const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const { authRouter } = require("./authRoute");
const user = require("./userRoute");
const brand = require("./brand");
const reaview = require("./reaviewRoute");

const options = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.js",
};

router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);
router.use("/", user);
router.use("/", authRouter);
router.use("/", brand);
router.use("/", reaview);

module.exports = router;
