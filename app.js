const express = require("express");

const router = require("./src/routes/index");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
