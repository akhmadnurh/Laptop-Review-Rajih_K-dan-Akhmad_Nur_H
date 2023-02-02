const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Laptop Review" });
});

const auth = require("./authRoute");
const user = require("./userRoute");
const brand = require("./brandRoute");
const review = require("./reviewRoute");
const comment = require("./commentRoute");
const product = require("./productRoute");

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
router.use("/", auth);
router.use("/", brand);
router.use("/", review);
router.use("/", comment);
router.use("/", product);

module.exports = router;
