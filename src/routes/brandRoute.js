const express = require("express");
// Get Module Controller Start

const {
  createBrand,
  getById,
  getall,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const { adminAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/brand", adminAuth, createBrand);
router.get("/brand/:id", getById);
router.get("/brand", getall);
router.patch("/brand/:id", adminAuth, updateBrand);
router.delete("/brand/:id", adminAuth, deleteBrand);

module.exports = router;
