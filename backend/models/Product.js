const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true }, // We store the link: "/uploads/img.jpg"
  isAvailable: { type: Boolean, default: true },
  stock: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model("Product", productSchema);
