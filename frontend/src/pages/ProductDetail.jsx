import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, Truck, ShoppingBag, Check, Calendar, Clock } from "lucide-react";
import axios from "axios";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Rental State
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Fetch product from Backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Could not load product details.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center">
        <div className="animate-pulse text-brand-gold text-xl font-serif">Loading masterpiece...</div>
      </div>
    );

  if (error || !product)
    return (
      <div className="min-h-screen bg-brand-gray flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The gear you are looking for might have been moved or retired.</p>
        <button
          onClick={() => navigate("/equipment")}
          className="px-8 py-3 bg-brand-dark text-white uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors"
        >
          Back to Collection
        </button>
      </div>
    );

  // Handle price naming difference
  const currentPrice = product.pricePerDay || product.price;

  // Logic for total price is kept for cart data, but hidden from UI calculation as requested
  const totalPrice = currentPrice * days;

  const handleAddToCart = () => {
    if (!startDate) {
      alert("Please select a start date for your rental.");
      return;
    }

    addToCart({
      ...product,
      id: product._id,
      startDate,
      days,
      price: currentPrice,
    });

    setIsAdded(true);
  };

  const imageSrc = product.image && product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`;

  return (
    <div className="font-sans antialiased bg-brand-gray min-h-screen flex flex-col selection:bg-brand-gold selection:text-white">
      <Navbar />

      {/* ADJUSTED: Removed the 'h-32' spacer and used padding on container instead for exact spacing */}
      <div className="container mx-auto px-6 pb-24 flex-1 pt-24">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-brand-dark transition-colors text-sm uppercase tracking-wider font-bold group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Gear
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          {/* --- LEFT COLUMN: IMAGE GALLERY --- */}
          <div className="lg:col-span-7">
            {/* Added sticky positioning correctly */}
            <div className="sticky top-32 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN: DETAILS & CONFIGURATOR --- */}
          <div className="lg:col-span-5">
            <div className="flex flex-col h-full">
              {/* Header Info */}
              <div className="mb-8 border-b border-gray-200 pb-8">
                <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs mb-3 block">{product.category}</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight mb-4">{product.name}</h1>

                {/* Fixed Horizontal Rating */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < (product.rating || 5) ? "#D4AF37" : "#E5E7EB"} stroke="none" />
                    ))}
                  </div>
                  <span className="font-bold text-brand-dark">{product.rating || "5.0"}</span>
                  <span className="text-gray-400">({product.reviews || 12} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10 text-gray-600 leading-relaxed space-y-4">
                <h3 className="text-brand-dark font-bold uppercase tracking-widest text-xs">Overview</h3>
                <p>
                  {product.description ||
                    "Experience audio excellence with this premium equipment. Designed for professionals who demand clarity and reliability in every performance."}
                </p>
              </div>

              {/* --- RENTAL WIDGET --- */}
              {/* Removed overflow-hidden to ensure Date Picker popup isn't clipped */}
              <div className="bg-white rounded-2xl p-6 shadow-xl shadow-brand-dark/5 border border-gray-100 relative">
                {/* Gold top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold to-brand-dark"></div>

                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Price per day</p>
                    <div className="text-3xl font-serif font-bold text-brand-dark">${currentPrice}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500">
                      <Calendar size={14} className="text-brand-gold" /> Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-brand-gold transition-all text-brand-dark cursor-pointer"
                      min={new Date().toISOString().split("T")[0]}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500">
                      <Clock size={14} className="text-brand-gold" /> Duration
                    </label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-brand-gold transition-all text-brand-dark appearance-none cursor-pointer"
                      value={days}
                      onChange={(e) => setDays(parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 7, 14, 30].map((d) => (
                        <option key={d} value={d}>
                          {d} {d === 1 ? "Day" : "Days"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* HIDDEN: Calculation Summary as requested */}
                {/* <div className="flex justify-between items-center py-4 border-t ..."> ... </div> */}

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-300 rounded-lg ${
                      isAdded ? "bg-green-600 text-white hover:bg-green-700" : "bg-brand-dark text-white hover:bg-brand-gold"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} /> Add to Cart
                      </>
                    )}
                  </button>

                  {/* Continue Browsing */}
                  <Link
                    to="/equipment"
                    className="block w-full py-4 text-center border border-gray-200 text-brand-dark font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    Continue Browsing
                  </Link>
                </div>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                  <ShieldCheck size={24} className="text-brand-gold" />
                  <span className="text-xs font-bold text-gray-500 uppercase leading-tight">
                    Damage
                    <br />
                    Protection
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                  <Truck size={24} className="text-brand-gold" />
                  <span className="text-xs font-bold text-gray-500 uppercase leading-tight">
                    Instant
                    <br />
                    Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
