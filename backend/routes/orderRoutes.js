const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Order = require("../models/Order");

// --- 1. Setup Email Transporter ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 2. POST New Order (Customer Request) ---
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    // Send Email to Client (Owner)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "client-email@example.com", // PUT CLIENT'S EMAIL HERE
      subject: `New Rental Request from ${savedOrder.customerName}`,
      text: `
        New Order Received!
        Name: ${savedOrder.customerName}
        Phone: ${savedOrder.phone}
        Date Needed: ${savedOrder.eventDate}
        Items: ${savedOrder.items.map((i) => i.productName).join(", ")}
        
        Check Admin Dashboard for details.
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email Error:", error);
      else console.log("Email sent: " + info.response);
    });

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 3. GET All Orders (Admin Dashboard) ---
router.get("/", async (req, res) => {
  try {
    // Sort by newest first
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
