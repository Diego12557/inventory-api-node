const express = require("express");
const router = express.Router();

const {
  createSale,
  getSales,
  getTotalSales,
  getTopProduct,
} = require("../controllers/salesController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getSales);
router.post("/create", verifyToken, createSale);
router.get("/total", verifyToken, getTotalSales);
router.get('/top-product', verifyToken, getTopProduct)

module.exports = router;
