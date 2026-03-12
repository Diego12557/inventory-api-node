const Sale = require("../models/Sale");
const Product = require("../models/Product");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  try {
    //Total ventas
    const totalSalesResult = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total" },
        },
      },
    ]);

    const totalSales = totalSalesResult[0]?.totalSales || 0;

    //Total Productos
    const totalProducts = await Product.countDocuments();

    //Total Usuarios
    const totalUsers = await User.countDocuments();

    //Producto mas vendido
    const topProductResult = await Sale.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          totalSold: { $sum: "products.quantity" },
        },
      },

      { $sort: { totalSold: -1 } },

      { $limit: 1 },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },

      { $unwind: "$product" },

      {
        $project: {
          _id: 0,
          product: "$product.name",
          totalSold: 1,
        },
      },
    ]);

    res.json({
      totalSales,
      totalProducts,
      totalUsers,
      topProduct: topProductResult[0] || null,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getDashboard }
