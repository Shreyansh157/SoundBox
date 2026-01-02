import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, CheckCircle } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/cards/ProductCard";
import { useInventory } from "../context/InventoryContext";
import styles from "./Equipment.module.css";

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

            {/* 1. Sort By (NEW) */}
            <div className={styles.filterGroup}>
              <h4>Sort By</h4>
              <div className={styles.radioList}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="sort" checked={sortBy === "featured"} onChange={() => setSortBy("featured")} />
                  <span>Featured</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="sort" checked={sortBy === "price-low"} onChange={() => setSortBy("price-low")} />
                  <span>Price: Low to High</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="sort" checked={sortBy === "price-high"} onChange={() => setSortBy("price-high")} />
                  <span>Price: High to Low</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="sort" checked={sortBy === "name"} onChange={() => setSortBy("name")} />
                  <span>Name (A-Z)</span>
                </label>
              </div>
            </div>

            {/* 2. Availability (NEW) */}
            <div className={styles.filterGroup}>
              <h4>Availability</h4>
              <label className={`${styles.checkboxLabel} ${inStockOnly ? styles.checked : ""}`}>
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  In Stock Only {inStockOnly && <CheckCircle size={14} color="#4ade80" />}
                </span>
              </label>
            </div>

            {/* 3. Category Filter */}
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

            {/* 4. Price Filter */}
            <div className={styles.filterGroup}>
              <div className={styles.rangeHeader}>
                <h4>Max Price / Day</h4>
                <span>${priceRange}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
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
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className={styles.mainContent}>
            {/* Header Area with Search */}
            <div className={styles.contentHeader}>
              <div className={styles.headerTitle}>
                <h1 className={styles.pageTitle}>{selectedCategory === "All" ? "All Equipment" : selectedCategory}</h1>
                <p className={styles.resultsCount}>
                  {filteredProducts.length} results found
                  {inStockOnly && <span style={{ color: "#4ade80", marginLeft: "6px" }}>• In Stock</span>}
                </p>
              </div>

              {/* Search Box */}
              <div className={styles.searchWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search gear..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
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
                    <Link to={`/product/${product._id || product.id}`} key={product._id || product.id}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className={styles.noResults}>
                <h3>No gear matches your criteria</h3>
                <p>Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange(500);
                    setSearchTerm("");
                    setInStockOnly(false);
                    setSortBy("featured");
                  }}
                >
                  Clear All Filters
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
