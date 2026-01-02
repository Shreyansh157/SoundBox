import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import axios from "axios";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    eventType: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", eventType: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Contact Error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="font-sans antialiased bg-brand-gray min-h-screen flex flex-col selection:bg-brand-gold selection:text-white">
      <Navbar />

      {/* ================= 1. SIMPLE HEADER (No Image Hero) ================= */}
      <section className="pt-32 pb-16 bg-brand-gray">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark leading-tight mb-4">
              Start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-dark italic">next production.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. CONTENT GRID ================= */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* LEFT COLUMN: Info (Dark Theme for Premium Feel) */}
          <div className="lg:col-span-5 bg-brand-dark text-white p-10 md:p-12 flex flex-col justify-between relative">
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-bold mb-6">Get in touch</h3>
              <p className="text-white/60 mb-10 leading-relaxed">
                Have a technical question or need a custom quote? Our engineers are ready to help you build the perfect soundscape.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">Email Us</span>
                    <p className="text-lg">rentals@soundbox.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">Call Us</span>
                    <p className="text-lg">+1 (555) 012-3456</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">Visit Us</span>
                    <p className="text-lg text-white/80">123 Audio Ave, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">Hours</span>
                    <p className="text-lg text-white/80">Mon-Fri: 8am - 8pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form (Light Theme) */}
          <div className="lg:col-span-7 p-10 md:p-12 bg-white relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">First Name</label>
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Jane"
                    className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-gold focus:bg-white transition-all placeholder:text-gray-300 text-brand-dark"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Last Name</label>
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-gold focus:bg-white transition-all placeholder:text-gray-300 text-brand-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-gold focus:bg-white transition-all placeholder:text-gray-300 text-brand-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Event Type</label>
                <div className="relative">
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-gold focus:bg-white transition-all appearance-none cursor-pointer text-brand-dark"
                  >
                    <option value="">Select type...</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Concert">Concert</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Private Party">Private Party</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ArrowRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your gear needs..."
                  className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-gold focus:bg-white transition-all placeholder:text-gray-300 resize-none text-brand-dark"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full md:w-auto px-8 py-4 bg-brand-dark text-white font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle size={20} />
                  <span>Message sent successfully!</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-3"
                >
                  <AlertCircle size={20} />
                  <span>Failed to send. Please try again.</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
