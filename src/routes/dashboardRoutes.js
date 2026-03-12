const express = require('express');
const router = express.Router();

const { getDashboard } = require('../controllers/dashboardController')
const verifyToken = require('../middlewares/verifyToken')
const verifyRole = require('../middlewares/verifyRole')


router.get('/', verifyToken, verifyRole(["admin"]), getDashboard)

module.exports = router