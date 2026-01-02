const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { addDays } = require("date-fns"); // You might need to install date-fns in backend too if you use it here, or just use native Date

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("productId", "name stock");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new booking (Handles Duration loop)
router.post("/", async (req, res) => {
  try {
    const { productId, date, quantity, customerName, days } = req.body;
    const duration = days || 1;
    const startDate = new Date(date);

    const bookingsToCreate = [];

    // Create a record for each day of the duration
    for (let i = 0; i < duration; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      bookingsToCreate.push({
        productId,
        date: currentDate,
        quantity,
        customerName,
      });
    }

    const createdBookings = await Booking.insertMany(bookingsToCreate);
    res.status(201).json(createdBookings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
