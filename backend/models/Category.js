const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true }, // For the Home page cards
});

module.exports = mongoose.model("Category", categorySchema);
