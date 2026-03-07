const express = require("express");
const routes = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

routes.get("/products", getProducts);
routes.post("/products", createProduct);
routes.get("/products/:id", getProductById);
routes.put("/products/:id", updateProduct);
routes.delete("/products/:id", deleteProduct);

module.exports = routes;
