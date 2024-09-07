const Prodcut = require("../models/productModel");

// Create Product

exports.createProduct = async (req, res, next) => {
  const product = await Prodcut.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

exports.getAllProduct = (req, res) => {
  res.status(200).json({
    message: "Route is working ",
  });
};
