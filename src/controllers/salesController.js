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

const getTotalSales = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total" },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTopProduct = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.productId",
          totalSold: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 0,
          product: "$product.name",
          totalSold: 1,
        },
      },
    ]);

    res.json(result[0])
  } catch (error) {
    res.status(500).json(error)
  }
};

module.exports = { createSale, getSales, getTotalSales, getTopProduct };
