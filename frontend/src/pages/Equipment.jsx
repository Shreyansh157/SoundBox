import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Star, X, Check } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/cards/ProductCard"; // Use the smart card!
import { PRODUCTS, CATEGORIES } from "../data/data";
import styles from "./Equipment.module.css";

const Equipment = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Grouping Logic
  const groupedProducts = {};
  if (activeCategory === "All" && !searchTerm) {
    CATEGORIES.forEach((cat) => {
      groupedProducts[cat.name] = PRODUCTS.filter((p) => p.category === cat.name);
    });
  } else {
    groupedProducts["Results"] = filteredProducts;
  }

  return (
    <div className={styles.wrapper}>
      <Navbar />

      {/* UNIFIED SEARCH & FILTER BAR */}
      <div className={styles.topBar}>
        <div className={`container ${styles.barContainer}`}>
          <div className={styles.searchGroup}>
            <Search className={styles.searchIcon} size={20} />
            <input type="text" placeholder="Search speakers, mixers, lights..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            {/* The Filter Trigger */}
            <div className={styles.divider}></div>
            <button className={`${styles.filterBtn} ${isFilterOpen ? styles.activeFilter : ""}`} onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <SlidersHorizontal size={18} />
              <span>Filter</span>
              {activeCategory !== "All" && <div className={styles.dot} />}
            </button>
          </div>

          {/* FILTER DROPDOWN */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div className={styles.filterMenu} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                <div className={styles.menuHeader}>
                  <span>Categories</span>
                  <button onClick={() => setActiveCategory("All")} className={styles.clearBtn}>
                    Clear
                  </button>
                </div>

                <div className={styles.categoryList}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      className={`${styles.catOption} ${activeCategory === cat.name ? styles.selected : ""}`}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setIsFilterOpen(false);
                      }}
                    >
                      {cat.name}
                      {activeCategory === cat.name && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className={`container ${styles.mainContent}`}>
        {Object.entries(groupedProducts).map(
          ([category, items]) =>
            items.length > 0 && (
              <section key={category} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>
                  {category === "Results" ? (searchTerm ? `Results for "${searchTerm}"` : activeCategory) : category}
                </h2>

                <div className={styles.grid}>
                  {items.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className={styles.cardLink}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>
              </section>
            )
        )}

        {filteredProducts.length === 0 && (
          <div className={styles.noResults}>
            <h3>No gear found</h3>
            <p>Try adjusting your search filters.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Equipment;
