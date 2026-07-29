const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const productController = require("../controllers/productController");

// owner
router.post("/me", authMiddleware, productController.createProduct);
router.get("/me", authMiddleware, productController.myProducts);
router.get("/me/:productId", authMiddleware, productController.getProduct);
router.put("/me/:productId", authMiddleware, productController.editProduct);
router.delete(
  "/me/:productId",
  authMiddleware,
  productController.deleteProduct,
);

// punlic
router.get("/", productController.getProducts);
router.get("/:productId", productController.getPublicProduct);

module.exports = router;
