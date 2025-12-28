import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // --- FIX 1: IMAGE URL HANDLING ---
  // If image is a relative path (starts with /uploads), prepend the backend URL.
  // If it's an absolute URL (starts with http), use it as is.
  const imageUrl = product.image && product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`;

  // --- FIX 2: PRICE HANDLING ---
  // Backend database uses 'pricePerDay', while static data used 'price'.
  const displayPrice = product.pricePerDay || product.price;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Pass the corrected image and price to the cart
    // This ensures the Cart page also displays the image correctly
    addToCart({
      ...product,
      image: imageUrl,
      price: displayPrice,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={product.name} />
        {product.tag && <span className={styles.tag}>{product.tag}</span>}
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h3>{product.name}</h3>
          <p className={styles.price}>
            ${displayPrice}
            <span>/day</span>
          </p>
        </div>

        <motion.button
          className={styles.addBtn}
          style={{
            backgroundColor: isAdded ? "#22c55e" : "white",
            color: isAdded ? "white" : "black",
            borderColor: isAdded ? "#22c55e" : "white",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAdd}
        >
          {isAdded ? <Check size={20} /> : <Plus size={20} />}
        </motion.button>
      </div>
    </div>
  );
};

export default ProductCard;
