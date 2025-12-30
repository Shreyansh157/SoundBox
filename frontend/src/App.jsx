import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Import an icon
import { useCart } from "./context/CartContext"; // Import Context

import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import "./App.css"; // Ensure CSS is imported

function App() {
  const location = useLocation();
  const { notification } = useCart(); // Get notification state

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* GLOBAL TOAST NOTIFICATION */}
      {notification && (
        <div className="toast-notification">
          <CheckCircle size={20} />
          <span>{notification}</span>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
