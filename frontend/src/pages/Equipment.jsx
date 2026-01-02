import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/cards/ProductCard";
import { useInventory } from "../context/InventoryContext"; // 1. Import Context
import styles from "./Equipment.module.css";

const Equipment = () => {
  const location = useLocation();
  const { products, categories } = useInventory(); // 2. Get Data from Context

  // --- FILTERS STATE ---
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "All");
  const [priceRange, setPriceRange] = useState(200); // Max price
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FILTER LOGIC ---
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    // 2. Price Filter (Handle backend 'pricePerDay' vs frontend 'price')
    const currentPrice = product.pricePerDay || product.price || 0;
    const matchesPrice = currentPrice <= priceRange;

    return matchesCategory && matchesPrice;
  });

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className="container">
        <div className={styles.layout}>
          {/* --- LEFT SIDEBAR --- */}
          <aside className={`${styles.sidebar} ${showMobileFilter ? styles.mobileShow : ""}`}>
            <div className={styles.filterHeader}>
              <h3>Filters</h3>
              <button className={styles.closeBtn} onClick={() => setShowMobileFilter(false)}>
                Close
              </button>
            </div>

            {/* Category Filter */}
            <div className={styles.filterGroup}>
              <h4>Category</h4>
              <div className={styles.optionList}>
                <button
                  className={`${styles.optionBtn} ${selectedCategory === "All" ? styles.activeOption : ""}`}
                  onClick={() => setSelectedCategory("All")}
                >
                  All Equipment
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id || cat.id}
                    className={`${styles.optionBtn} ${selectedCategory === cat.name ? styles.activeOption : ""}`}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className={styles.filterGroup}>
              <div className={styles.rangeHeader}>
                <h4>Max Price / Day</h4>
                <span>${priceRange}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500" // Increased max range for pro gear
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.rangeLabels}>
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Duration / Battery Filter (Demo) */}
            <div className={styles.filterGroup}>
              <h4>Battery Life</h4>
              <div className={styles.checkboxList}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> <span>8+ Hours</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> <span>12+ Hours</span>
                </label>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className={styles.mainContent}>
            {/* Header Area */}
            <div className={styles.contentHeader}>
              <div>
                <h1 className={styles.pageTitle}>{selectedCategory === "All" ? "All Equipment" : selectedCategory}</h1>
                <p className={styles.resultsCount}>{filteredProducts.length} results found</p>
              </div>

              {/* Mobile Filter Toggle */}
              <button className={styles.mobileFilterBtn} onClick={() => setShowMobileFilter(true)}>
                <Filter size={18} /> Filters
              </button>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div layout className={styles.grid}>
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    // Use _id from backend, fallback to id
                    <Link to={`/product/${product._id || product.id}`} key={product._id || product.id}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className={styles.noResults}>
                <h3>No gear found</h3>
                <p>Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange(500);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Equipment;
