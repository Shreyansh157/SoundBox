import React, { useState, useEffect } from "react";
// 1. Import useLocation
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Check } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/cards/ProductCard";
import styles from "./Equipment.module.css";

const Equipment = () => {
  // 2. Get Location
  const location = useLocation();

  // 3. Initialize activeCategory with passed state OR "All"
  const [activeCategory, setActiveCategory] = useState(location.state?.category || "All");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/categories"),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Grouping Logic
  const groupedProducts = {};
  if (activeCategory === "All" && !searchTerm) {
    categories.forEach((cat) => {
      groupedProducts[cat.name] = products.filter((p) => p.category === cat.name);
    });
  } else {
    groupedProducts["Results"] = filteredProducts;
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: "100px" }}>
        Loading inventory...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.topBar}>
        <div className={`container ${styles.barContainer}`}>
          <div className={styles.searchGroup}>
            <Search className={styles.searchIcon} size={20} />
            <input type="text" placeholder="Search speakers, mixers, lights..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <div className={styles.divider}></div>
            <button className={`${styles.filterBtn} ${isFilterOpen ? styles.activeFilter : ""}`} onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <SlidersHorizontal size={18} />
              <span>Filter</span>
              {activeCategory !== "All" && <div className={styles.dot} />}
            </button>
          </div>

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
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
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
                    <Link to={`/product/${product._id}`} key={product._id} className={styles.cardLink}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>
              </section>
            )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Equipment;
