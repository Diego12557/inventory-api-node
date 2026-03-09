const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("userId", "username email")

    

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo productos",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      userId: req.user.id,
    });

    const savedProduct = await product.save();

    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error creando producto",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error buscando producto",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(updateProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {

    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if(!deleteProduct){
      return res.status(401).json("El producto no existe")
    }

    res.json({
      message: "Producto eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error eliminado producto",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
