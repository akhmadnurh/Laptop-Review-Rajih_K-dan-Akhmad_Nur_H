const express = require("express");
// Get Module Controller Start

const { userAuth, adminAuth } = require("../middlewares/authMiddleware");
const {
  createReaview,
  getByIdReaview,
  updateReaview,
  deleteReview,
} = require("../controllers/reaviewController");
const router = express.Router();

router.post("/review/:idProduct", userAuth, createReaview);
router.get("/review/:id", getByIdReaview);
router.patch("/review/:idReview", userAuth, updateReaview);
router.delete("/review/:idReview", adminAuth, deleteReview);

module.exports = router;
