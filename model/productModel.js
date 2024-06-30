const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"], // 'required' instead of 'require'
    },
    quantity: {
      type: Number,
      required: true, // 'required' instead of 'require'
      default: 0,
    },
    price: {
      type: Number,
      required: true, // 'required' instead of 'require'
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
