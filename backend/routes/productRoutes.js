const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

// --- 1. Setup Image Storage ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
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

// --- 3. GET Single Product ---
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 4. POST New Product ---
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
      image: `/uploads/${req.file.filename}`,
      stock: req.body.stock || 1, // <--- NEW
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 5. PUT Update Product ---
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, category, pricePerDay, description, stock } = req.body; // <--- NEW
    let updateData = { name, category, pricePerDay, description, stock };

    // If a new file is uploaded, update the image path
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 6. DELETE Product ---
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
