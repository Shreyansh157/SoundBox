require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product"); // Adjust path if needed

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected for Seeding"))
  .catch((err) => console.log(err));

// The Placeholder Data
const sampleProducts = [
  {
    name: "JBL PartyBox 310",
    category: "Speakers",
    pricePerDay: 1500,
    description: "Portable party speaker with lights.",
    image: "/uploads/placeholder-speaker.jpg", // Make sure this file exists in their uploads folder!
    isAvailable: true,
  },
  {
    name: "Shure SM58 Mic",
    category: "Microphones",
    pricePerDay: 500,
    description: "Standard vocal microphone.",
    image: "/uploads/placeholder-mic.jpg",
    isAvailable: true,
  },
];

// The Magic Function
const seedDB = async () => {
  await Product.deleteMany({}); // Optional: Clears old data first
  await Product.insertMany(sampleProducts);
  console.log("🌱 Database Seeded with Starter Products!");
  mongoose.connection.close();
};

seedDB();
