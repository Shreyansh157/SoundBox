import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag, Lock, Calendar, Clock, Loader2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;

    setIsSubmitting(true);

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

      localStorage.removeItem("soundbox_cart");
      alert("Request Sent Successfully! Check your inbox.");
      window.location.href = "/";
    } catch (err) {
      console.error("Order Error:", err);
      alert("Failed to send request. Make sure all fields are filled.");
      setIsSubmitting(false);
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

  // --- EMPTY STATE ---
  if (cart.length === 0) {
    return (
      <div className="font-sans antialiased bg-brand-gray min-h-screen flex flex-col selection:bg-brand-gold selection:text-white">
        <Navbar />
        {/* SPACER FOR FIXED NAVBAR */}
        <div className="w-full h-32 flex-shrink-0"></div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-8 text-brand-gold">
            <ShoppingBag size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Your cart is empty.</h1>
          <p className="text-gray-500 mb-10 text-lg">Ready to start your production? Browse our inventory.</p>
          <Link
            to="/equipment"
            className="px-10 py-4 bg-brand-dark text-white font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors rounded-sm"
          >
            Browse Equipment
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans antialiased bg-brand-gray min-h-screen flex flex-col selection:bg-brand-gold selection:text-white">
      <Navbar />

      {/* --- SPACER DIV --- */}
      {/* This invisible block pushes content down below the fixed navbar reliably */}
      <div className="w-full h-32 flex-shrink-0"></div>

      <div className="container mx-auto px-6 pb-24 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Rental Cart</h1>
          <Link
            to="/equipment"
            className="hidden md:flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Continue Browsing
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- LEFT COLUMN: CART ITEMS --- */}
          <div className="flex-1">
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              <div className="col-span-6">Product</div>
              <div className="col-span-2">Rate / Dur</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="space-y-6">
              <AnimatePresence>
                {cart.map((item) => {
                  const itemId = item._id || item.id;
                  const duration = item.days || 1;
                  const price = item.pricePerDay || item.price || 0;
                  const itemTotal = price * item.quantity * duration;
                  const imgSrc = item.image && item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`;

                  return (
                    <motion.div
                      key={itemId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col md:grid md:grid-cols-12 gap-6 items-center"
                    >
                      {/* 1. Product Info */}
                      <div className="col-span-6 w-full flex items-center gap-6">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                          <img src={imgSrc} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-brand-dark text-lg mb-1">{item.name}</h3>
                          {item.startDate && (
                            <div className="inline-flex items-center gap-1 text-xs text-brand-gold bg-brand-gold/10 px-2 py-1 rounded font-bold uppercase tracking-wider">
                              <Calendar size={12} /> {item.startDate}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 2. Rate */}
                      <div className="col-span-2 w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start text-sm">
                        <span className="md:hidden font-bold text-gray-400 text-xs uppercase">Rate</span>
                        <div>
                          <div className="font-bold text-brand-dark">
                            ${price} <span className="text-gray-400 font-normal">/ day</span>
                          </div>
                          <div className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                            <Clock size={12} /> {duration} Days
                          </div>
                        </div>
                      </div>

                      {/* 3. Quantity */}
                      <div className="col-span-2 w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center">
                        <span className="md:hidden font-bold text-gray-400 text-xs uppercase">Quantity</span>
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                          <button
                            onClick={() => (item.quantity === 1 ? removeFromCart(itemId) : decreaseQuantity(itemId))}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-brand-dark transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-bold text-sm text-brand-dark">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(itemId)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-brand-dark transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* 4. Total & Remove */}
                      <div className="col-span-2 w-full md:w-auto flex justify-between items-center md:block text-right">
                        <span className="md:hidden font-bold text-gray-400 text-xs uppercase">Total</span>
                        <div>
                          <div className="font-bold text-brand-dark text-lg">${itemTotal.toFixed(2)}</div>
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="text-gray-400 hover:text-red-500 text-xs mt-2 transition-colors flex items-center justify-end gap-1 ml-auto"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-xl shadow-xl shadow-brand-dark/5 border border-gray-100 p-8 sticky top-32">
              <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">Order Summary</h2>

              {/* Cost Breakdown */}
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-brand-dark">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8.875%)</span>
                  <span className="font-bold text-brand-dark">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-gold font-bold">
                  <span>Damage Protection</span>
                  <span>FREE</span>
                </div>
              </div>

              <div className="h-px bg-gray-100 my-6"></div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Total Due</span>
                <span className="text-3xl font-serif font-bold text-brand-dark">${total.toFixed(2)}</span>
              </div>

              {/* Checkout / Form Toggle */}
              {!isCheckingOut ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-4 bg-brand-dark text-white font-bold uppercase tracking-widest hover:bg-brand-gold transition-all rounded-lg flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              ) : (
                <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="bg-brand-gray p-4 rounded-lg border border-gray-200 mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark mb-4 border-b border-gray-200 pb-2">Request Quote</h3>

                    <div className="space-y-3">
                      <div>
                        <input
                          name="customerName"
                          value={formData.customerName}
                          required
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-brand-gold transition-all"
                        />
                      </div>
                      <div>
                        <input
                          name="phone"
                          value={formData.phone}
                          required
                          onChange={handleInputChange}
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-brand-gold transition-all"
                        />
                      </div>
                      <div>
                        <input
                          name="email"
                          value={formData.email}
                          required
                          onChange={handleInputChange}
                          type="email"
                          placeholder="Email Address"
                          className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-brand-gold transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Event Date</label>
                        <input
                          name="eventDate"
                          value={formData.eventDate}
                          required
                          onChange={handleInputChange}
                          type="date"
                          className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-brand-gold transition-all text-gray-500"
                        />
                      </div>
                      <div>
                        <textarea
                          name="address"
                          value={formData.address}
                          required
                          onChange={handleInputChange}
                          placeholder="Delivery Address..."
                          rows="2"
                          className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-brand-gold transition-all resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-gold text-white font-bold uppercase tracking-widest hover:bg-brand-dark transition-all rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        Submit Request <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-full text-xs text-gray-400 hover:text-brand-dark underline"
                  >
                    Cancel
                  </button>
                </motion.form>
              )}

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                <Lock size={12} />
                <span>Secure 256-bit SSL Encrypted payment.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
