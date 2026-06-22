const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const storeController = require("../controllers/storeController");

// router.post("/", authMiddleware, storeController.createStore);

module.exports = router;
