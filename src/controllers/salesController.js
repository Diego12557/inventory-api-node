const Sale = require("../models/Sale");
const Product = require("../models/Product");

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("userId", "username email")
      .populate("products.productId", "name price");

    res.json(sales);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createSale = async (req, res) => {
  try {
    const { products } = req.body;

    let total = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json("Producto no encontrado");
      }

      if (product.stock < item.quantity) {
        return res.status(404).json("Stock Insuficiente");
      }

      total += product.price * item.quantity;

      product.stock -= item.quantity;

      await product.save();
    }

    const sale = new Sale({
      products,
      total,
      userId: req.user.id,
    });

    const savedSale = await sale.save();
    res.json(savedSale);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createSale, getSales };
