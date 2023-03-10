const express = require("express");
// Get Module Controller Start

const { userAuth, adminAuth } = require("../middlewares/authMiddleware");
const {
  createReview,
  getByIdReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const router = express.Router();

router.post("/review/:idProduct", userAuth, createReview);
router.get("/review/:idReview", getByIdReview);
router.patch("/review/:idReview", userAuth, updateReview);
router.delete("/review/:idReview", userAuth, deleteReview);

module.exports = router;
