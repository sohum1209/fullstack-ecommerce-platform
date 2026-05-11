const express = require("express");
const protect = require("../middleware/auth");
const { createOrder, getOrders } = require("../controllers/order");

const router = express.Router();

router.use(protect);
router.get("/", getOrders);
router.post("/", createOrder);

module.exports = router;
