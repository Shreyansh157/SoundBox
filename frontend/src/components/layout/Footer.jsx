import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* 1. NEWSLETTER / CTA SECTION */}
      <div className={`container ${styles.newsletterSection}`}>
        <div className={styles.newsletterContent}>
          <h2>
            Join the <span className={styles.gradientText}>Noise.</span>
          </h2>
          <p>Get the latest gear drops and event production tips delivered to your inbox.</p>
        </div>
        <div className={styles.inputGroup}>
          <Mail className={styles.inputIcon} size={20} />
          <input type="email" placeholder="Enter your email" />
          <button aria-label="Subscribe">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.separator} />

      {/* 2. MAIN LINKS SECTION */}
      <div className={`container ${styles.mainGrid}`}>
        {/* BRAND COL */}
        <div className={styles.brandCol}>
          <h3>SoundBox.</h3>
          <p>
            The city's premier audio rental house. <br />
            We amplify human connection through <br />
            precision sound.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink}>
              <Instagram size={20} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Twitter size={20} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Facebook size={20} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* LINKS COL 1 */}
        <div className={styles.linksCol}>
          <h4>Inventory</h4>
          <Link to="/equipment" state={{ category: "Speakers" }}>
            Speakers & Subs
          </Link>
          <Link to="/equipment" state={{ category: "Microphones" }}>
            Microphones
          </Link>
          <Link to="/equipment" state={{ category: "DJ Gear" }}>
            DJ Consoles
          </Link>
          <Link to="/equipment" state={{ category: "Lighting" }}>
            Lighting
          </Link>
        </div>

        {/* LINKS COL 2 */}
        <div className={styles.linksCol}>
          <h4>Company</h4>
          <Link to="/about">Our Story</Link>
          <Link to="/contact">Contact Support</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/terms">Terms & Privacy</Link>
        </div>

        {/* CONTACT COL */}
        <div className={styles.contactCol}>
          <h4>Visit Us</h4>
          <div className={styles.contactItem}>
            <MapPin size={18} className={styles.contactIcon} />
            <p>
              123 Audio Ave, <br />
              New York, NY 10012
            </p>
          </div>
          <div className={styles.contactItem}>
            <Phone size={18} className={styles.contactIcon} />
            <p>+1 (555) 012-3456</p>
          </div>
          <div className={styles.contactItem}>
            <Mail size={18} className={styles.contactIcon} />
            <p>hello@soundbox.com</p>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BAR */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomContent}>
            <p>© 2025 SoundBox Rentals. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
