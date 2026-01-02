import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInventory } from "../../context/InventoryContext";
import styles from "./SearchModal.module.css";

const SearchModal = ({ isOpen, onClose }) => {
  const { products } = useInventory();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Filter Logic
  const results = query ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div className={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search Header */}
            <div className={styles.header}>
              <Search className={styles.searchIcon} size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for gear..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.input}
              />
              <button onClick={onClose} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            {/* Results List */}
            <div className={styles.resultsContainer}>
              {query && results.length === 0 ? (
                <div className={styles.emptyState}>No products found for "{query}"</div>
              ) : (
                <div className={styles.list}>
                  {results.map((product) => (
                    <Link
                      key={product._id || product.id}
                      to={`/product/${product._id || product.id}`}
                      className={styles.resultItem}
                      onClick={onClose} // Close modal on click
                    >
                      <img
                        src={product.image?.startsWith("http") ? product.image : `http://localhost:5000${product.image}`}
                        alt={product.name}
                        className={styles.thumb}
                      />
                      <div className={styles.info}>
                        <h4>{product.name}</h4>
                        <span className={styles.category}>{product.category}</span>
                      </div>
                      <ChevronRight size={16} className={styles.arrow} />
                    </Link>
                  ))}
                </div>
              )}
              {/* Quick Links / Suggestions when empty */}
              {!query && (
                <div className={styles.suggestions}>
                  <span>Popular:</span>
                  <button onClick={() => setQuery("Speaker")}>Speakers</button>
                  <button onClick={() => setQuery("Mic")}>Microphones</button>
                  <button onClick={() => setQuery("Light")}>Lights</button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
