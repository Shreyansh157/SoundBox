import React from "react";
import { motion } from "framer-motion";
import { Target, Heart, Award } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import { TEAM, TIMELINE } from "../data/data";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />

      {/* 1. CINEMATIC INTRO */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            We amplify <br />
            <span className={styles.gradientText}>human connection.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className={styles.heroSub}>
            SoundBox isn't just a rental company. We are the infrastructure behind the city's most memorable moments. From underground raves to
            corporate keynotes, we ensure the message is heard.
          </motion.p>
        </div>
      </section>

      {/* 2. MISSION / VALUES */}
      <section className={styles.valuesSection}>
        <div className={`container ${styles.valuesGrid}`}>
          <div className={styles.valueCard}>
            <Target className={styles.valueIcon} />
            <h3>Precision</h3>
            <p>We believe audio should be invisible. No feedback, no dropouts, just pure sound.</p>
          </div>
          <div className={styles.valueCard}>
            <Heart className={styles.valueIcon} />
            <h3>Passion</h3>
            <p>We are musicians and engineers first. We care about your mix as much as you do.</p>
          </div>
          <div className={styles.valueCard}>
            <Award className={styles.valueIcon} />
            <h3>Reliability</h3>
            <p>Our gear is tested 3 times before dispatch. We don't do "technical difficulties".</p>
          </div>
        </div>
      </section>

      {/* 3. THE FOUNDERS */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>The Architects</h2>
            <p>The team behind the technology.</p>
          </div>

          <div className={styles.teamGrid}>
            {TEAM.map((member) => (
              <div key={member.id} className={styles.teamCard}>
                <div className={styles.imageWrapper}>
                  <img src={member.image} alt={member.name} />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.teamInfo}>
                  <h3>{member.name}</h3>
                  <span className={styles.role}>{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HISTORY TIMELINE */}
      <section className={styles.historySection}>
        <div className={`container ${styles.historyContainer}`}>
          <h2>Our Journey</h2>
          <div className={styles.timeline}>
            {TIMELINE.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <span className={styles.year}>{item.year}</span>
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
