const express = require("express");
const router = express.Router();

const { createSale, getSales } = require("../controllers/salesController");
const verifyToken = require("../middlewares/verifyToken");

router.get('/', verifyToken, getSales)
router.post("/create", verifyToken, createSale);

module.exports = router;
