import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, Activity, Users } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/cards/ProductCard";
import { CATEGORIES, PRODUCTS, CASES, TESTIMONIALS } from "../data/data";
import styles from "./Home.module.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />

      {/* 1. CINEMATIC HERO */}
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
              <button className={styles.primaryBtn}>Explore Solutions</button>
              <button className={styles.secondaryBtn}>View Catalog</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS / TRUST (The "About" Hook) */}
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

      {/* 3. SOLUTIONS (Categories with Images) */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2>Our Solutions</h2>
            <a href="#" className={styles.link}>
              See All Services <ArrowRight size={16} />
            </a>
          </div>
          <div className={styles.solutionGrid}>
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.id} className={styles.solutionCard} whileHover={{ y: -5 }}>
                <div className={styles.solutionImage}>
                  <img src={cat.image} alt={cat.name} />
                  <div className={styles.solutionOverlay} />
                  <cat.icon className={styles.solutionIcon} size={32} />
                </div>
                <div className={styles.solutionContent}>
                  <h3>{cat.name}</h3>
                  <p>{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CASES (Portfolio) */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2>Recent Productions</h2>
          </div>
          <div className={styles.caseGrid}>
            {CASES.map((item) => (
              <div key={item.id} className={styles.caseCard}>
                <img src={item.image} alt={item.title} />
                <div className={styles.caseInfo}>
                  <span>{item.type}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      {/* <section className={styles.testimonialSection}>
        <div className="container">
          <h2 className={styles.centerTitle}>Trusted by the best.</h2>
          <div className={styles.testiGrid}>
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className={styles.testiCard}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="#3b82f6" stroke="none" />
                  ))}
                </div>
                <p>"{t.text}"</p>
                <div className={styles.testiAuthor}>
                  <strong>{t.author}</strong> — <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 6. TRENDING PRODUCTS */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2>Trending</h2>
            <a href="/Equipment" className={styles.link}>
              View Full Catalog <ArrowRight size={16} />
            </a>
          </div>
          <div className={styles.productGrid}>
            {PRODUCTS.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
