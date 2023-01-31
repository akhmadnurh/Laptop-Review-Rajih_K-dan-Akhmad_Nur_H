const express = require("express");
// Get Module Controller Start
const { getProfileById, createProfileDetail } = require("../controllers/userController");
const router = express.Router();

router.get("/getprofile", getProfileById);
router.post("/postprofile", createProfileDetail);

module.exports = router;
