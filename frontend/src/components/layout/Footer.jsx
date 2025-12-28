// src/components/layout/Footer.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.brandCol}>
          <h3>SoundBox.</h3>
          <p>Professional audio equipment rentals for events, studios, and live performances.</p>
        </div>

        <div className={styles.linksCol}>
          <h4>Equipment</h4>
          <NavLink to="/equipment">Speakers</NavLink>
          <NavLink to="/equipment">Microphones</NavLink>
          <NavLink to="/equipment">Mixers</NavLink>
        </div>

        <div className={styles.linksCol}>
          <h4>Company</h4>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/terms">Terms of Rental</NavLink>
        </div>

        <div className={styles.linksCol}>
          <h4>Contact</h4>
          <p>hello@soundbox.com</p>
          <p>+1 (555) 012-3456</p>
          <p>123 Audio Ave, NY</p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© 2024 SoundBox Rentals. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
