const express = require("express");

const { adminAuth } = require("../middlewares/authMiddleware");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRating,
} = require("../controllers/productController");
const router = express.Router();

const basePath = "/product";

router.get(`${basePath}`, getProducts);
router.get(`${basePath}/:productId`, getProductById);
router.post(`${basePath}/`, adminAuth, createProduct);
router.patch(`${basePath}/:productId`, adminAuth, updateProduct);
router.delete(`${basePath}/:productId`, adminAuth, deleteProduct);
router.get(`${basePath}/rating/:productId`, getRating);

module.exports = router;
