import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, Truck, ShoppingBag, Check, Calendar, Clock } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import { PRODUCTS } from "../data/data";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // 1. New State for Rental Options
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) return null;

  // 2. Calculate Dynamic Price
  const totalPrice = product.price * days;

  const handleAddToCart = () => {
    // Basic Validation
    if (!startDate) {
      alert("Please select a start date for your rental.");
      return;
    }

    // 3. Pass the extra data (startDate, days, total) to Cart
    addToCart({
      ...product,
      startDate,
      days,
      price: product.price, // Base price per day
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={`container ${styles.detailContainer}`}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={16} /> Back to Gear
        </button>

        <div className={styles.contentGrid}>
          {/* IMAGES */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* INFO & CONFIGURATOR */}
          <div className={styles.info}>
            <div className={styles.header}>
              <span className={styles.categoryTag}>{product.category}</span>
              <h1>{product.name}</h1>
              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className={styles.reviews}>({product.reviews} reviews)</span>
              </div>
            </div>

            {/* --- NEW RENTAL CONFIGURATOR --- */}
            <div className={styles.configurator}>
              <div className={styles.configRow}>
                <div className={styles.inputGroup}>
                  <label>
                    <Calendar size={14} /> Start Date
                  </label>
                  <input
                    type="date"
                    className={styles.dateInput}
                    min={new Date().toISOString().split("T")[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>
                    <Clock size={14} /> Duration
                  </label>
                  <select className={styles.selectInput} value={days} onChange={(e) => setDays(parseInt(e.target.value))}>
                    {[1, 2, 3, 4, 5, 7, 14, 30].map((d) => (
                      <option key={d} value={d}>
                        {d} {d === 1 ? "Day" : "Days"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Calculation Display */}
              <div className={styles.priceSummary}>
                <div className={styles.math}>
                  <span>${product.price}</span> x <span>{days} days</span>
                </div>
                <div className={styles.finalTotal}>${totalPrice}</div>
              </div>
            </div>
            {/* ------------------------------- */}

            <div className={styles.actions}>
              <button
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                style={{
                  backgroundColor: isAdded ? "#22c55e" : "white",
                  color: isAdded ? "white" : "black",
                  borderColor: isAdded ? "#22c55e" : "white",
                }}
              >
                {isAdded ? (
                  <>
                    {" "}
                    <Check size={20} /> Added for {days} Day{days > 1 && "s"}{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <ShoppingBag size={20} /> Add to Cart{" "}
                  </>
                )}
              </button>
            </div>

            <div className={styles.description}>
              <h3>Overview</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.trustFeatures}>
              <div className={styles.trustItem}>
                <ShieldCheck size={20} className={styles.trustIcon} />
                <span>Damage protection included</span>
              </div>
              <div className={styles.trustItem}>
                <Truck size={20} className={styles.trustIcon} />
                <span>Instant delivery available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
