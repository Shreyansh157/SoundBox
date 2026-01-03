import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ShoppingBag, Search, ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useInventory } from "../../context/InventoryContext";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const { totalItems } = useCart();
  const { categories } = useInventory();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text color logic: White on Home (before scroll), Dark otherwise
  const textColor = isHome && !scrolled ? "text-white" : "text-brand-dark";
  const hoverColor = isHome && !scrolled ? "hover:text-brand-gold" : "hover:text-brand-gold";
  const bgClass = isHome && !scrolled ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-sm py-4";

  return (
    <>
      <nav className={`z-60 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass} ${isHome && !scrolled ? "py-6" : ""}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className={`text-2xl font-serif font-bold uppercase tracking-widest ${textColor}`}>
            Raagadj<span className="text-brand-gold">audio</span>.
          </NavLink>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide uppercase ${textColor}`}>
            <NavLink to="/" className={`transition-colors ${hoverColor}`}>
              Home
            </NavLink>

            <div className="relative group h-full flex items-center">
              <NavLink to="/equipment" className={`flex items-center gap-1 transition-colors ${hoverColor}`}>
                Collection <ChevronDown size={14} />
              </NavLink>

              {/* DROPDOWN MENU */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-2 min-w-[200px] text-brand-dark">
                  {categories.map((cat) => (
                    <NavLink
                      key={cat._id}
                      to="/equipment"
                      state={{ category: cat.name }} // <--- PASSING STATE HERE
                      className="block px-4 py-2 hover:bg-gray-50 rounded text-xs font-bold transition-colors"
                    >
                      {cat.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <NavLink to="/about" className={`transition-colors ${hoverColor}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={`transition-colors ${hoverColor}`}>
              Contact
            </NavLink>
          </div>

          {/* Icons */}
          <div className={`flex items-center space-x-6 ${textColor}`}>
            <button onClick={() => setIsSearchOpen(true)} className={`transition-colors ${hoverColor}`}>
              <Search size={20} />
            </button>
            <NavLink to="/cart" className={`relative transition-colors ${hoverColor}`}>
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </NavLink>
            <button className={`md:hidden transition-colors ${hoverColor}`}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
