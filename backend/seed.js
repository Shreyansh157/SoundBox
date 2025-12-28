require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Category = require("./models/Category");

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected for Seeding"))
  .catch((err) => console.log(err));

// --- 1. CATEGORIES (With Images!) ---
const sampleCategories = [
  {
    name: "Speakers",
    description: "Active PA systems, subwoofers & portable sound.",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Microphones",
    description: "Wireless handhelds, studio condensers & instrument mics.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "DJ Gear",
    description: "Industry standard mixers, CDJs & controllers.",
    image:
      "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lighting",
    description: "Moving heads, lasers, wash lights & atmospherics.",
    image: "https://images.unsplash.com/photo-1573339887617-d674bc961c31?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&h=400&q=80",
  },
];

// --- 2. PRODUCTS ---
const sampleProducts = [
  // --- SPEAKERS ---
  {
    name: "JBL PartyBox 310",
    category: "Speakers",
    pricePerDay: 45,
    description: "Huge sound, dazzling lights, and unbelievable power set this speaker apart from the crowd.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
  },
  {
    name: "Marshall S1 Pro+",
    category: "Speakers",
    pricePerDay: 60,
    description: "The ultimate all-in-one PA system. Musicians, DJs, and general presenters can get professional sound instantly.",
    image:
      "https://images.unsplash.com/photo-1671856114466-757e82694ff9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
  },
  {
    name: "QSC K12.2",
    category: "Speakers",
    pricePerDay: 75,
    description: "Best-in-class loudspeaker for demanding audio professionals. 2000W Peak power.",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
  },
  {
    name: "Electro-Voice ZLX-12BT",
    category: "Speakers",
    pricePerDay: 50,
    description: "Bluetooth-enabled powered loudspeaker suitable for mains or monitors. Clear and punchy sound.",
    image:
      "https://images.unsplash.com/photo-1612241143917-d05c85c43751?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
  },
  {
    name: "Yamaha DBR10",
    category: "Speakers",
    pricePerDay: 40,
    description: "Portable powered loudspeaker. The most compact in its lineup, capable of delivering a maximum SPL of 129dB.",
    image:
      "https://images.unsplash.com/photo-1609702847389-b8aec1b0b929?q=80&w=963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
  },
  {
    name: "Mackie Thump15A",
    category: "Speakers",
    pricePerDay: 55,
    description: "1300W high-performance powered loudspeaker with Dynamic Bass Response technology.",
    image:
      "https://images.unsplash.com/photo-1699567363076-4b614b65d57e?q=80&w=1034&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
  },

  // --- MICROPHONES ---
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
  {
    name: "Shure SM58 Wireless Kit",
    category: "Microphones",
    pricePerDay: 45,
    description: "Industry-standard vocal microphone now with digital wireless freedom. Includes receiver and handheld transmitter.",
    image: "https://images.unsplash.com/photo-1623838423652-32b719416556?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "Rode NT1-A",
    category: "Microphones",
    pricePerDay: 30,
    description: "Large-diaphragm condenser microphone known for its warmth, clarity, and incredibly low self-noise.",
    image: "https://images.unsplash.com/photo-1549411984-7e5d8000966f?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "Audio-Technica AT2020",
    category: "Microphones",
    pricePerDay: 20,
    description: "Cardioid condenser microphone. The price/performance standard in side-address studio condenser microphone technology.",
    image: "https://images.unsplash.com/photo-1520114878144-6123749968dd?q=80&w=800",
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
  {
    name: "Pioneer CDJ-3000",
    category: "DJ Gear",
    pricePerDay: 150,
    description: "A new dimension. The multi-player that evolves with your creativity. Driven by a new MPU.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "Numark Mixtrack Pro FX",
    category: "DJ Gear",
    pricePerDay: 40,
    description: "2-Deck DJ Controller with FX Paddles and 6-Inch Jog Wheels. Perfect for beginners and mobile DJs.",
    image: "https://images.unsplash.com/photo-1461784568600-47432b0dd8d1?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "Allen & Heath Xone:96",
    category: "DJ Gear",
    pricePerDay: 110,
    description: "Analogue DJ Mixer. The long-awaited follow-up to a genuine club classic.",
    image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=800",
    isAvailable: true,
  },

  // --- LIGHTING ---
  {
    name: "Chauvet DJ GigBAR Move",
    category: "Lighting",
    pricePerDay: 95,
    description: "5-in-1 lighting system including moving heads, derbies, washes, a laser, and strobe effect.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "ADJ Mega Hex Par",
    category: "Lighting",
    pricePerDay: 15,
    description: "Compact, low profile par designed for uplighting and stage lighting, and will bring color and excitement to any event.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "Martin Rush MH 5",
    category: "Lighting",
    pricePerDay: 65,
    description: "Compact bright LED profile moving head with efficient optics and punchy output.",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "Hurricane Haze 4D",
    category: "Lighting",
    pricePerDay: 45,
    description: "Low profile hazer with adjustable scoop to direct the haze and a built-in fan.",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800",
    isAvailable: true,
  },
  {
    name: "Laserworld CS-1000RGB",
    category: "Lighting",
    pricePerDay: 80,
    description: "Full color RGB laser system, ideal for clubs, mobile DJs, and private events.",
    image: "https://images.unsplash.com/photo-1504825852554-7933907ebc38?q=80&w=800",
    isAvailable: true,
  },
];

const seedDB = async () => {
  try {
    // Clear old data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Insert new data
    await Category.insertMany(sampleCategories);
    // Note: Use sampleProducts array from previous step or define it here
    if (typeof sampleProducts !== "undefined" && sampleProducts.length > 0) {
      await Product.insertMany(sampleProducts);
    }

    console.log("🌱 Database Seeding Complete!");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
