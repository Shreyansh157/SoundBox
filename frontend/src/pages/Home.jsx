import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Activity, Users, Zap, Speaker, Mic2, Music, Radio, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/cards/ProductCard";
import { CLIENTS, GOOGLE_REVIEWS } from "../data/data";

const CATEGORY_ICONS = {
  Speakers: Speaker,
  Microphones: Mic2,
  "DJ Gear": Music,
  Lighting: Zap,
  Default: Radio,
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/categories"),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // --- AUTOMATIC CAROUSEL EFFECT ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const getIcon = (name) => CATEGORY_ICONS[name] || CATEGORY_ICONS["Default"];

  const handleCategoryClick = (categoryName) => {
    navigate("/equipment", { state: { category: categoryName } });
  };

  // Carousel Logic
  const nextReview = () => setCurrentReviewIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
  const prevReview = () => setCurrentReviewIndex((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);

  return (
    <div className="font-sans antialiased bg-brand-gray min-h-screen flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat fixed-bg">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Vision of <br />
              <span className="text-brand-gold italic">Perfect Sound.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              We provide the technology that makes your event impactful. From intimate gatherings to stadium-sized experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/equipment">
                <button className="px-8 py-4 bg-brand-gold text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-sm min-w-[200px]">
                  Explore Solutions
                </button>
              </Link>
              <Link to="/equipment">
                <button className="px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-sm min-w-[200px]">
                  View Catalog
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-gray to-transparent"></div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="bg-white p-12 rounded-xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex-1 text-center px-4">
              <Activity className="w-8 h-8 mx-auto text-brand-gold mb-3" />
              <h3 className="text-4xl font-serif font-bold text-brand-dark">20+ Years</h3>
              <p className="text-gray-500 uppercase text-xs tracking-widest font-bold mt-1">Experience</p>
            </div>

            <div className="flex-1 text-center px-4 pt-8 md:pt-0">
              <Zap className="w-8 h-8 mx-auto text-brand-gold mb-3" />
              <h3 className="text-4xl font-serif font-bold text-brand-dark">1,500+</h3>
              <p className="text-gray-500 uppercase text-xs tracking-widest font-bold mt-1">Events Powered</p>
            </div>

            <div className="flex-1 text-center px-4 pt-8 md:pt-0">
              <Users className="w-8 h-8 mx-auto text-brand-gold mb-3" />
              <h3 className="text-4xl font-serif font-bold text-brand-dark">9.8/10</h3>
              <p className="text-gray-500 uppercase text-xs tracking-widest font-bold mt-1">Client Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CLIENTS MARQUEE --- */}
      <section className="py-12 overflow-hidden bg-brand-gray">
        <div className="container mx-auto px-6 mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Trusted by industry leaders</p>
        </div>
        <div className="relative flex w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, index) => (
              <div
                key={index}
                className="w-32 h-16 flex items-center justify-center opacity-100 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img src={client.logo} alt={client.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .animate-marquee { animation: marquee 35s linear infinite; }
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
      </section>

      {/* --- SOLUTIONS (Categories) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-6">
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Inventory</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mt-2">Our Solutions</h2>
            </div>
            <Link
              to="/equipment"
              className="mt-4 md:mt-0 flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-gold transition-colors"
            >
              See All Services <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => {
              const IconComponent = getIcon(cat.name);
              const imgUrl = cat.image && cat.image.startsWith("http") ? cat.image : `http://localhost:5000${cat.image}`;
              return (
                <motion.div
                  key={cat._id}
                  whileHover={{ y: -8 }}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group cursor-pointer relative h-96 rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gray-200">
                    <img src={imgUrl} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

                  <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                    <IconComponent className="mb-4 text-brand-gold" size={32} />
                    <h3 className="text-2xl font-serif font-bold mb-2">{cat.name}</h3>
                    <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- TRENDING PRODUCTS --- */}
      <section className="py-24 bg-brand-gray">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-6">
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Catalog</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mt-2">Trending Gear</h2>
            </div>
            <Link
              to="/equipment"
              className="mt-4 md:mt-0 flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-gold transition-colors"
            >
              View Full Catalog <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((prod) => (
              <Link to={`/product/${prod._id}`} key={prod._id} className="block group">
                <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <ProductCard product={prod} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            {/* CLEANER HEADER: Removed Google Branding */}
            <div className="inline-block border-b-2 border-brand-gold pb-1 mb-6">
              <span className="text-brand-gold uppercase tracking-[0.2em] text-sm font-bold">Feedback</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Client Testimonials</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-10 md:p-16 backdrop-blur-sm min-h-[300px] flex items-center justify-center">
              {/* Carousel Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center w-full"
                >
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={24} fill="#D4AF37" stroke="none" />
                    ))}
                  </div>
                  <p className="text-xl md:text-3xl font-serif italic leading-relaxed mb-10 text-gray-200">
                    "{GOOGLE_REVIEWS[currentReviewIndex].text}"
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-brand-dark"
                      style={{ background: GOOGLE_REVIEWS[currentReviewIndex].color }}
                    >
                      {GOOGLE_REVIEWS[currentReviewIndex].avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg">{GOOGLE_REVIEWS[currentReviewIndex].author}</h4>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{GOOGLE_REVIEWS[currentReviewIndex].date}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Arrows */}
              <button
                onClick={prevReview}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-brand-gold hover:text-white transition-all text-white z-20"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextReview}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-brand-gold hover:text-white transition-all text-white z-20"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {GOOGLE_REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReviewIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentReviewIndex ? "w-8 bg-brand-gold" : "w-2 bg-gray-600"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
