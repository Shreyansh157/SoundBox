import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useCart } from "../../context/CartContext"; // Import the hook
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Get the function
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent navigating to detail page
    e.stopPropagation(); // Double safety

    addToCart(product); // Call the context function

    // Visual Feedback (Turn Green)
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} />
        {product.tag && <span className={styles.tag}>{product.tag}</span>}
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h3>{product.name}</h3>
          <p className={styles.price}>
            ${product.price}
            <span>/day</span>
          </p>
        </div>

        <motion.button
          className={styles.addBtn}
          style={{
            backgroundColor: isAdded ? "#22c55e" : "white", // Green if added
            color: isAdded ? "white" : "black",
            borderColor: isAdded ? "#22c55e" : "white",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAdd} // Click handler
        >
          {isAdded ? <Check size={20} /> : <Plus size={20} />}
        </motion.button>
      </div>
    </div>
  );
};

export default ProductCard;
