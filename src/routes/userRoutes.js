const express = require('express')
const routes = express.Router();

const { registerUser, login } = require("../controllers/userController")


routes.post("/register", registerUser);
routes.post("/login", login)

module.exports = routes