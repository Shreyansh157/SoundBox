const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Order = require("../models/Order");

// --- 1. Setup Ethereal Transporter ---
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 2. POST New Order ---
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    const itemsList = savedOrder.items.map((i) => `- ${i.productName} (x${i.quantity})`).join("\n");

    // --- EMAIL 1: TO OWNER ---
    const ownerMailOptions = {
      from: '"SoundBox System" <system@soundbox.com>',
      to: "owner@soundbox.com", // Arbitrary for testing
      subject: `📢 New Order: ${savedOrder.customerName}`,
      text: `New Order!\n\nCustomer: ${savedOrder.customerName}\nItems:\n${itemsList}`,
    };

    // --- EMAIL 2: TO CUSTOMER ---
    const customerMailOptions = {
      from: '"SoundBox Rentals" <rentals@soundbox.com>',
      to: savedOrder.email,
      subject: "Order Confirmation",
      text: `Hi ${savedOrder.customerName},\n\nWe received your order for:\n${itemsList}\n\nWe will contact you shortly.`,
    };

    // Send and Log Preview URLs
    const infoOwner = await transporter.sendMail(ownerMailOptions);
    const infoCustomer = await transporter.sendMail(customerMailOptions);

    console.log("---------------------------------------");
    console.log("📧 Ethereal Email Sent!");
    console.log("👉 Preview Owner Email: " + nodemailer.getTestMessageUrl(infoOwner));
    console.log("👉 Preview Customer Email: " + nodemailer.getTestMessageUrl(infoCustomer));
    console.log("---------------------------------------");

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({ message: "Order saved but email failed", error: err.message });
  }
});

// --- 3. GET All Orders ---
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
