require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected for Seeding"))
  .catch((err) => console.log(err));

const sampleProducts = [
  // --- SPEAKERS ---
  {
    name: "JBL PartyBox 310",
    category: "Speakers",
    pricePerDay: 45,
    description: "Huge sound, dazzling lights, and unbelievable power set this speaker apart from the crowd.",
    image:
      "https://images.unsplash.com/photo-1632073383420-01461da1e082?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
  },
  {
    name: "Bose S1 Pro+",
    category: "Speakers",
    pricePerDay: 60,
    description: "The ultimate all-in-one PA system. Musicians, DJs, and general presenters can get professional sound instantly.",
    image: "https://images.unsplash.com/photo-1545454675-3527b9b9ea1e?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "QSC K12.2",
    category: "Speakers",
    pricePerDay: 75,
    description: "Best-in-class loudspeaker for demanding audio professionals. 2000W Peak power.",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800",
    isAvailable: true,
  },
  // --- MICS ---
  {
    name: "Shure SM7B",
    category: "Microphones",
    pricePerDay: 35,
    description: "The SM7B dynamic microphone has a smooth, flat, wide-range frequency response appropriate for music and speech.",
    image: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "Sennheiser e835",
    category: "Microphones",
    pricePerDay: 25,
    description: "Lead vocal stage mic, designed to perform under pressure. Uniform frequency pick-up pattern.",
    image: "https://images.unsplash.com/photo-1558742569-fe6d39d05837?q=80&w=800",
    isAvailable: true,
  },
  // --- DJ GEAR ---
  {
    name: "Pioneer DDJ-1000",
    category: "DJ Gear",
    pricePerDay: 120,
    description: "The DDJ-1000 offers the ideal solution if you want to play at bigger events and party venues.",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d58b727d?q=80&w=800",
    isAvailable: true,
  },
];

const seedDB = async () => {
  try {
    await Product.deleteMany({}); // Clears old data first so you don't get duplicates
    await Product.insertMany(sampleProducts);
    console.log("🌱 Database Populated with 6 Products!");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
