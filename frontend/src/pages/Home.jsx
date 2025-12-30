import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Activity, Users, Zap, Speaker, Mic2, Music, Radio, Star } from "lucide-react"; // Import Star
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/cards/ProductCard";
import { CASES, CLIENTS, GOOGLE_REVIEWS } from "../data/data"; // 1. IMPORT GOOGLE_REVIEWS
import styles from "./Home.module.css";

// ... Keep existing constants (fadeInUp, CATEGORY_ICONS) ...
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CATEGORY_ICONS = {
  Speakers: Speaker,
  Microphones: Mic2,
  "DJ Gear": Music,
  Lighting: Zap,
  Default: Radio,
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ... Keep existing fetch logic ...
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/categories"),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const getIcon = (name) => {
    return CATEGORY_ICONS[name] || CATEGORY_ICONS["Default"];
  };

  const handleCategoryClick = (categoryName) => {
    navigate("/equipment", { state: { category: categoryName } });
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroContainer}`}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className={styles.heroTitle}>
              Vision of <br />
              <span className={styles.gradientText}>Perfect Sound.</span>
            </h1>
            <p className={styles.heroSub}>
              We provide the technology that makes your event impactful. From intimate gatherings to stadium-sized experiences.
            </p>
            <div className={styles.heroActions}>
              <Link to="/equipment">
                <button className={styles.primaryBtn}>Explore Solutions</button>
              </Link>
              <Link to="/equipment">
                <button className={styles.secondaryBtn}>View Catalog</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <Activity className={styles.statIcon} />
            <h3>20+ Years</h3>
            <p>Experience</p>
          </div>
          <div className={styles.statItem}>
            <Zap className={styles.statIcon} />
            <h3>1,500+</h3>
            <p>Events Powered</p>
          </div>
          <div className={styles.statItem}>
            <Users className={styles.statIcon} />
            <h3>9.8/10</h3>
            <p>Client Score</p>
          </div>
        </div>
      </section>

      {/* TRUSTED CLIENTS CAROUSEL */}
      <section className={styles.clientsSection}>
        <div className={styles.marqueeContainer}>
          <p className={styles.clientLabel}>Trusted by industry leaders</p>
          <div className={styles.marqueeTrack}>
            {[...CLIENTS, ...CLIENTS].map((client, index) => (
              <div key={index} className={styles.clientLogo}>
                <img src={client.logo} alt={client.name} />
              </div>
            ))}
          </div>
          <div className={styles.overlayLeft} />
          <div className={styles.overlayRight} />
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2>Our Solutions</h2>
            <Link to="/equipment" className={styles.link}>
              See All Services <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.solutionGrid}>
            {categories.map((cat) => {
              const IconComponent = getIcon(cat.name);
              return (
                <motion.div
                  key={cat._id}
                  className={styles.solutionCard}
                  whileHover={{ y: -5 }}
                  onClick={() => handleCategoryClick(cat.name)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.solutionImage}>
                    <img src={cat.image && cat.image.startsWith("http") ? cat.image : `http://localhost:5000${cat.image}`} alt={cat.name} />
                    <div className={styles.solutionOverlay} />
                    <IconComponent className={styles.solutionIcon} size={32} />
                  </div>
                  <div className={styles.solutionContent}>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2>Trending</h2>
            <Link to="/equipment" className={styles.link}>
              View Full Catalog <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.productGrid}>
            {products.slice(0, 4).map((prod) => (
              <Link to={`/product/${prod._id}`} key={prod._id} style={{ textDecoration: "none" }}>
                <ProductCard product={prod} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: GOOGLE REVIEWS SECTION */}
      <section className={styles.reviewsSection}>
        <div className="container">
          <div className={styles.reviewsHeader}>
            <div className={styles.googleBrand}>
              <span className={styles.googleText}>Google</span>
              <div className={styles.ratingBadge}>
                <span>4.9</span>
                <div className={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#F4B400" stroke="none" />
                  ))}
                </div>
              </div>
            </div>
            <p>Based on 120+ reviews</p>
          </div>

          <div className={styles.reviewsGrid}>
            {GOOGLE_REVIEWS.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.avatar} style={{ background: review.color }}>
                      {review.avatar}
                    </div>
                    <div>
                      <h4>{review.author}</h4>
                      <span className={styles.reviewDate}>{review.date}</span>
                    </div>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className={styles.gLogo} />
                </div>
                <div className={styles.starLine}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#F4B400" stroke="none" />
                  ))}
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
