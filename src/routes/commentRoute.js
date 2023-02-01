const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const {
  getCommentsByUserId,
  getCommentsByReviewId,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const router = express.Router();

const basePath = "/comment";

router.get(`${basePath}/`, userAuth, getCommentsByUserId);
router.get(`${basePath}/review/:reviewId`, userAuth, getCommentsByReviewId);
router.post(`${basePath}/review/:reviewId`, userAuth, createComment);
router.patch(`${basePath}/:commentId`, userAuth, updateComment);
router.delete(`${basePath}/:commentId`, userAuth, deleteComment);

module.exports = router;
