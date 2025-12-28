import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios"; // Ensure axios is imported
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    eventType: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", eventType: "", message: "" }); // Clear form
    } catch (err) {
      console.error("Contact Error:", err);
      setStatus("error");
    }
  };

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
            {/* ... keeping other methods same ... */}
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="Jane" />
              </div>
              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Doe" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="jane@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label>Event Type</label>
              <select name="eventType" value={formData.eventType} onChange={handleChange}>
                <option value="">Select type...</option>
                <option value="Wedding">Wedding</option>
                <option value="Concert">Concert</option>
                <option value="Corporate">Corporate</option>
                <option value="Private Party">Private Party</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Message</label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your gear needs..."
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
              {status === "sending" ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>

            {/* Success/Error Messages */}
            {status === "success" && (
              <div style={{ marginTop: "15px", color: "#22c55e", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle size={18} /> Message sent successfully!
              </div>
            )}
            {status === "error" && (
              <div style={{ marginTop: "15px", color: "#ef4444", display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertCircle size={18} /> Failed to send. Please try again.
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
