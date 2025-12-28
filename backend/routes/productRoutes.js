const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

// --- 1. Setup Image Storage ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files go to 'backend/uploads'
  },
  filename: function (req, file, cb) {
    // Rename file to avoid duplicates (e.g., 17823612-speaker.jpg)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// --- 2. GET All Products ---
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 3. POST New Product (Admin Only) ---
// Note: 'image' matches the name attribute in the frontend form
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      pricePerDay: req.body.pricePerDay,
      description: req.body.description,
      // We save the relative path
      image: `/uploads/${req.file.filename}`,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
