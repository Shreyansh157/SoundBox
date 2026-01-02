const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  date: { type: Date, required: true }, // The specific day this item is booked
  quantity: { type: Number, required: true, default: 1 },
  customerName: { type: String, default: "Manual Booking" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
