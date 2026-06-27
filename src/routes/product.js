const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const productController = require("../controllers/productController");

router.get("/", authMiddleware, productController.myProducts);

router.post("/", authMiddleware, productController.createProduct);

router.get("/:productId", authMiddleware, productController.getProduct);
router.put("/:productId", authMiddleware, productController.editProduct);
router.delete("/:productId", authMiddleware, productController.deleteProduct);

module.exports = router;
