import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag, Lock, Calendar, Clock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // <--- NEW STATE

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    eventDate: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    setIsSubmitting(true); // <--- DISABLE BUTTON

    try {
      const orderData = {
        ...formData,
        items: cart.map((item) => ({
          productId: item._id || item.id,
          productName: item.name,
          quantity: item.quantity,
        })),
      };

      await axios.post("http://localhost:5000/api/orders", orderData);

      // Clear Cart & Redirect
      localStorage.removeItem("soundbox_cart");
      alert("Request Sent Successfully! Check your inbox.");
      window.location.href = "/";
    } catch (err) {
      console.error("Order Error:", err);
      alert("Failed to send request. Make sure all fields are filled.");
      setIsSubmitting(false); // <--- RE-ENABLE BUTTON IF ERROR
    }
  };

  // --- CALCULATIONS ---
  const subtotal = cart.reduce((total, item) => {
    const duration = item.days || 1;
    const price = item.pricePerDay || item.price || 0;
    return total + price * item.quantity * duration;
  }, 0);

  const taxRate = 0.08875;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  if (cart.length === 0) {
    return (
      <div className={styles.wrapper}>
        <Navbar />
        <div className={`container ${styles.emptyContainer}`}>
          <ShoppingBag size={64} className={styles.emptyIcon} />
          <h1>Your cart is empty.</h1>
          <p>Ready to start your production? Browse our inventory.</p>
          <Link to="/equipment" className={styles.browseBtn}>
            Browse Equipment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={`container ${styles.cartContainer}`}>
        <h1 className={styles.pageTitle}>Rental Cart</h1>

        <div className={styles.grid}>
          {/* LEFT COLUMN: CART ITEMS */}
          <div className={styles.itemsColumn}>
            <div className={styles.itemsHeader}>
              <span>Product</span>
              <span>Rate / Duration</span>
              <span>Qty</span>
              <span>Total</span>
            </div>

            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id || item.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.cartItem}
                >
                  <div className={styles.itemInfo}>
                    <img src={item.image && item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <div className={styles.metaRow}>
                        {item.startDate && (
                          <span className={styles.dateBadge}>
                            <Calendar size={10} /> {item.startDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.rateColumn}>
                    <div className={styles.basePrice}>${item.pricePerDay || item.price} / day</div>
                    <div className={styles.durationBadge}>
                      <Clock size={12} /> {item.days || 1} Days
                    </div>
                  </div>

                  <div className={styles.quantityControl}>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn} title="Remove">
                      <Trash2 size={16} />
                    </button>
                    <span className={styles.qtyDisplay}>{item.quantity}</span>
                  </div>

                  <div className={styles.itemTotal}>${((item.pricePerDay || item.price) * item.quantity * (item.days || 1)).toFixed(2)}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className={styles.summaryColumn}>
            <div className={styles.summaryCard}>
              <h2>Order Summary</h2>

              <div className={styles.costRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.costRow}>
                <span>Tax (8.875%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className={styles.costRow}>
                <span>Damage Protection</span>
                <span>FREE</span>
              </div>

              <div className={styles.divider} />

              <div className={`${styles.costRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {!isCheckingOut ? (
                <button className={styles.checkoutBtn} onClick={() => setIsCheckingOut(true)}>
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              ) : (
                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.billingForm} onSubmit={handleSubmitOrder}>
                  <h3>Request Quote</h3>

                  <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input
                      name="customerName"
                      value={formData.customerName}
                      required
                      onChange={handleInputChange}
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Phone Number</label>
                    <input name="phone" value={formData.phone} required onChange={handleInputChange} type="tel" placeholder="98765 43210" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input name="email" value={formData.email} required onChange={handleInputChange} type="email" placeholder="john@example.com" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Event Date</label>
                    <input
                      name="eventDate"
                      value={formData.eventDate}
                      required
                      onChange={handleInputChange}
                      type="date"
                      // style={{ colorScheme: "dark" }}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Delivery Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      required
                      onChange={handleInputChange}
                      placeholder="Full address..."
                      rows="3"
                    ></textarea>
                  </div>

                  {/* --- UPDATED BUTTON --- */}
                  <button
                    type="submit"
                    className={styles.payBtn}
                    disabled={isSubmitting} // Logic to disable
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spin-icon" style={{ animation: "spin 1s linear infinite" }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowRight size={16} /> Submit Request
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>

            <p className={styles.secureText}>
              <Lock size={12} /> Secure 256-bit SSL Encrypted payment.
            </p>
          </div>
        </div>
      </div>

      {/* Add simple keyframe for spinner if not present globally */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      <Footer />
    </div>
  );
};

export default Cart;
