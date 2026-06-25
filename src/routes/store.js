const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const storeController = require("../controllers/storeController");

router.get("/", storeController.getStores);

router.post("/", authMiddleware, storeController.createStore);

router.get("/me", authMiddleware, storeController.myStore);

router.put("/me", authMiddleware, storeController.editStore);

router.delete("/me", authMiddleware, storeController.deleteStore);

module.exports = router;
