// src/components/cards/CategoryCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ name, icon: Icon }) => {
  return (
    <motion.div className={styles.card} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className={styles.iconBox}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <div className={styles.meta}>
        <span className={styles.name}>{name}</span>
        <ArrowRight size={16} className={styles.arrow} />
      </div>
    </motion.div>
  );
};

export default CategoryCard;
