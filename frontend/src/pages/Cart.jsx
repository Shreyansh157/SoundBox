import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag, CreditCard, Lock, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // --- FIXED CALCULATIONS ---
  // Now includes (item.days || 1) in the math
  const subtotal = cart.reduce((total, item) => {
    const duration = item.days || 1;
    return total + item.price * item.quantity * duration;
  }, 0);

  const taxRate = 0.08875; // NYC Sales Tax
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
                  key={item.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.cartItem}
                >
                  {/* Product Info */}
                  <div className={styles.itemInfo}>
                    <img src={item.image} alt={item.name} />
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

                  {/* Rate & Duration Display */}
                  <div className={styles.rateColumn}>
                    <div className={styles.basePrice}>${item.price} / day</div>
                    <div className={styles.durationBadge}>
                      <Clock size={12} /> {item.days || 1} Days
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className={styles.quantityControl}>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn} title="Remove">
                      <Trash2 size={16} />
                    </button>
                    <span className={styles.qtyDisplay}>{item.quantity}</span>
                  </div>

                  {/* Item Total (Price * Days * Qty) */}
                  <div className={styles.itemTotal}>${(item.price * item.quantity * (item.days || 1)).toFixed(2)}</div>
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
                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.billingForm}>
                  <h3>Billing Details</h3>

                  <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input type="email" placeholder="john@example.com" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Card Information</label>
                    <div className={styles.cardInput}>
                      <CreditCard size={20} className={styles.cardIcon} />
                      <input type="text" placeholder="0000 0000 0000 0000" />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <input type="text" placeholder="MM/YY" className={styles.smallInput} />
                    <input type="text" placeholder="CVC" className={styles.smallInput} />
                  </div>

                  <button type="button" className={styles.payBtn}>
                    <Lock size={16} /> Pay ${total.toFixed(2)}
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

      <Footer />
    </div>
  );
};

export default Cart;
