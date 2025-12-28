import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />

      <section className={styles.header}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Start your <br />
            <span className={styles.gradientText}>next production.</span>
          </motion.h1>
        </div>
      </section>

      <section className={`container ${styles.contentGrid}`}>
        {/* Contact Info */}
        <div className={styles.infoCol}>
          <h3>Get in touch</h3>
          <p className={styles.sub}>Have a technical question or need a custom quote? Our engineers are ready to help.</p>

          <div className={styles.contactMethods}>
            <div className={styles.method}>
              <div className={styles.iconBox}>
                <Mail size={20} />
              </div>
              <div>
                <span>Email Us</span>
                <p>rentals@soundbox.com</p>
              </div>
            </div>

            <div className={styles.method}>
              <div className={styles.iconBox}>
                <Phone size={20} />
              </div>
              <div>
                <span>Call Us</span>
                <p>+1 (555) 012-3456</p>
              </div>
            </div>

            <div className={styles.method}>
              <div className={styles.iconBox}>
                <MapPin size={20} />
              </div>
              <div>
                <span>Visit Us</span>
                <p>123 Audio Ave, NY 10001</p>
              </div>
            </div>

            <div className={styles.method}>
              <div className={styles.iconBox}>
                <Clock size={20} />
              </div>
              <div>
                <span>Hours</span>
                <p>Mon-Fri: 8am - 8pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.formCol}>
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input type="text" placeholder="Jane" />
              </div>
              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input type="text" placeholder="Doe" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" placeholder="jane@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label>Event Type</label>
              <select>
                <option>Select type...</option>
                <option>Wedding</option>
                <option>Concert</option>
                <option>Corporate</option>
                <option>Private Party</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Message</label>
              <textarea rows="4" placeholder="Tell us about your gear needs..."></textarea>
            </div>

            <button type="button" className={styles.submitBtn}>
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
