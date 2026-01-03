import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, CheckCircle, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/cards/ProductCard";
import { useInventory } from "../context/InventoryContext";

const Equipment = () => {
  const location = useLocation();
  const { products, categories } = useInventory();

  // --- FILTERS STATE ---
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "All");
  const [priceRange, setPriceRange] = useState(500);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // NEW FILTERS
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured"); // featured, price-low, price-high, name

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FILTER & SORT LOGIC ---
  const filteredProducts = products
    .filter((product) => {
      // 1. Category Filter
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

      // 2. Price Filter
      const currentPrice = product.pricePerDay || product.price || 0;
      const matchesPrice = currentPrice <= priceRange;

      // 3. Search Filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      // 4. Availability Filter
      const matchesStock = inStockOnly ? product.stock && product.stock > 0 : true;

      return matchesCategory && matchesPrice && matchesSearch && matchesStock;
    })
    .sort((a, b) => {
      // 5. Sorting Logic
      const priceA = a.pricePerDay || a.price || 0;
      const priceB = b.pricePerDay || b.price || 0;

      switch (sortBy) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0; // "featured" keeps default order
      }
    });

  return (
    <div className="font-sans antialiased bg-brand-gray min-h-screen flex flex-col selection:bg-brand-gold selection:text-white">
      <Navbar />

      {/* --- SPACER DIV --- */}
      {/* This invisible block physically pushes content down below the fixed navbar */}
      <div className="w-full h-32 flex-shrink-0"></div>

      <div className="container? mx-auto px-16 pb-20 flex-1">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- LEFT SIDEBAR (Desktop Sticky / Mobile Modal) --- */}
          <aside
            className={`
              fixed inset-0 z-50 md:z-40 bg-white p-6 transition-transform duration-300 lg:translate-x-0 lg:static lg:bg-transparent lg:p-0 lg:w-72 lg:block lg:flex-shrink-0
              ${showMobileFilter ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-8 lg:hidden">
              <h3 className="text-2xl font-serif font-bold text-brand-dark">Filters</h3>
              <button onClick={() => setShowMobileFilter(false)} className="text-gray-500 hover:text-brand-dark">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-10 lg:sticky lg:top-36 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2 custom-scrollbar">
              {/* 1. Sort By */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <SlidersHorizontal size={14} /> Sort By
                </h4>
                <div className="space-y-3">
                  {[
                    { id: "featured", label: "Featured" },
                    { id: "price-low", label: "Price: Low to High" },
                    { id: "price-high", label: "Price: High to Low" },
                    { id: "name", label: "Name (A-Z)" },
                  ].map((option) => (
                    <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          sortBy === option.id ? "border-brand-gold" : "border-gray-300 group-hover:border-brand-gold"
                        }`}
                      >
                        {sortBy === option.id && <div className="w-2 h-2 rounded-full bg-brand-gold" />}
                      </div>
                      <input type="radio" name="sort" className="hidden" checked={sortBy === option.id} onChange={() => setSortBy(option.id)} />
                      <span
                        className={`text-sm ${sortBy === option.id ? "text-brand-dark font-semibold" : "text-gray-600 group-hover:text-brand-dark"}`}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Availability */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Availability</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      inStockOnly ? "bg-brand-gold border-brand-gold" : "border-gray-300 group-hover:border-brand-gold"
                    }`}
                  >
                    {inStockOnly && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                  <span
                    className={`text-sm flex items-center gap-2 ${
                      inStockOnly ? "text-brand-dark font-semibold" : "text-gray-600 group-hover:text-brand-dark"
                    }`}
                  >
                    In Stock Only
                  </span>
                </label>
              </div>

              {/* 3. Category */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Category</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedCategory === "All" ? "bg-brand-dark text-white font-bold shadow-lg" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    All Equipment
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id || cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedCategory === cat.name ? "bg-brand-dark text-white font-bold shadow-lg" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Price Filter */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Max Price / Day</h4>
                  <span className="text-sm font-bold text-brand-gold">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>

            {/* Mobile Close Button (Bottom) */}
            <div className="mt-8 lg:hidden">
              <button onClick={() => setShowMobileFilter(false)} className="w-full py-3 bg-brand-dark text-white font-bold uppercase tracking-widest">
                View Results
              </button>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <h1 className="text-4xl font-serif font-bold text-brand-dark mb-2">
                  {selectedCategory === "All" ? "Full Collection" : selectedCategory}
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Showing {filteredProducts.length} items
                  {inStockOnly && <span className="text-green-600 ml-2 font-bold">• In Stock</span>}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Search Box */}
                <div className="relative group flex-1 md:w-64">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-gold transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Search model, brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all text-sm"
                  />
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden p-3 bg-brand-dark text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 text-start">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <Link to={`/product/${product._id || product.id}`} key={product._id || product.id} className="block h-full">
                      {/* Wrapper to ensure height consistency */}
                      <div className="h-full rounded-2xl p-2 transition-all duration-300">
                        <ProductCard product={product} />
                      </div>
                    </Link>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <Filter size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-dark mb-2">No gear found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange(500);
                    setSearchTerm("");
                    setInStockOnly(false);
                    setSortBy("featured");
                  }}
                  className="px-6 py-2 border border-brand-dark text-brand-dark font-bold uppercase text-xs tracking-widest hover:bg-brand-dark hover:text-white transition-colors rounded"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {/* Mobile Filter Overlay Background */}
      {showMobileFilter && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setShowMobileFilter(false)} />}
    </div>
  );
};

export default Equipment;
