const express = require("express");
require("dotenv").config();
const cors = require("cors");

const router = require("./src/routes/index");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
