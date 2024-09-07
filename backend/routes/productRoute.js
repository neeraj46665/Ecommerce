const express = require("express");
const {
  getAllProduct,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/product").get(getAllProduct);
router.route("/product/new").post(createProduct);

module.exports = router;
