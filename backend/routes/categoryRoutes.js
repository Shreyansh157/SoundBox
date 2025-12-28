const express = require("express");
const router = express.Router();
const multer = require("multer");
const Category = require("../models/Category");

// --- 1. Setup Image Storage ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-cat-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// --- 2. GET All Categories ---
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 3. POST New Category (With Image Upload) ---
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Category image is required" });
    }

    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description,
      image: `/uploads/${req.file.filename}`, // Save path
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 4. PUT Update Category (With Optional Image Upload) ---
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    let updateData = { name, description };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 5. DELETE Category ---
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
