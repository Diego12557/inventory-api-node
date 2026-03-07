const express = require("express");
const routes = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

routes.get("/products", verifyToken, getProducts);
routes.post("/products", verifyToken,createProduct);
routes.get("/products/:id", verifyToken,getProductById);
routes.put("/products/:id", verifyToken,updateProduct);
routes.delete("/products/:id", verifyToken,deleteProduct);

module.exports = routes;
