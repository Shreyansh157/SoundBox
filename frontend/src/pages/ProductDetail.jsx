import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, Truck, ShoppingBag, Check, Calendar, Clock } from "lucide-react";
import axios from "axios";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Rental State
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Fetch product from Backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch specific product using the ID from URL
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Could not load product details.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        Loading...
      </div>
    );
  if (error || !product)
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        Product not found
      </div>
    );

  // Handle price naming difference (DB uses pricePerDay, Frontend used price)
  const currentPrice = product.pricePerDay || product.price;
  const totalPrice = currentPrice * days;

  const handleAddToCart = () => {
    if (!startDate) {
      alert("Please select a start date for your rental.");
      return;
    }

    addToCart({
      ...product,
      id: product._id, // Ensure ID is consistent for Cart
      startDate,
      days,
      price: currentPrice,
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
              {/* Ensure image path is correct. If it starts with /uploads, prepend server URL if needed, 
                  or ensure your index.js serves /uploads statically */}
              <img src={product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`} alt={product.name} />
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
                {/* Fallback for rating if not in DB yet */}
                <span>{product.rating || "5.0"}</span>
                <span className={styles.reviews}>({product.reviews || 0} reviews)</span>
              </div>
            </div>

            {/* --- RENTAL CONFIGURATOR --- */}
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
                  <span>${currentPrice}</span> x <span>{days} days</span>
                </div>
                <div className={styles.finalTotal}>${totalPrice}</div>
              </div>
            </div>

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
