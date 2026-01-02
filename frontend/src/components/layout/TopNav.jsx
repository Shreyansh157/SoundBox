import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBag, Search, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useInventory } from "../../context/InventoryContext";
import SearchModal from "./SearchModal"; // Import the new modal
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { totalItems } = useCart();
  const { categories } = useInventory();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for modal

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          {/* 1. LEFT: Logo */}
          <div className={styles.logo}>
            <NavLink to="/">Raagadjaudio</NavLink>
          </div>

          {/* 2. CENTER: Links */}
          <div className={styles.desktopLinks}>
            <NavLink to="/Home" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
              Home
            </NavLink>

            {/* Categories Dropdown */}
            <div className={styles.dropdownWrapper}>
              <NavLink to="/equipment" className={styles.dropdownTrigger}>
                Categories <ChevronDown size={14} style={{ marginTop: 2 }} />
              </NavLink>
              <div className={styles.dropdownMenu}>
                {categories && categories.length > 0 ? (
                  categories.map((cat) => (
                    <NavLink key={cat._id || cat.id} to={`/equipment?category=${cat.name}`} className={styles.dropdownItem}>
                      {cat.name}
                    </NavLink>
                  ))
                ) : (
                  <div className={styles.dropdownItem}>Loading...</div>
                )}
              </div>
            </div>

            <NavLink to="/about" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
              Contact
            </NavLink>
          </div>

          {/* 3. RIGHT: Search + Cart */}
          <div className={styles.actions}>
            {/* Search Trigger Button */}
            <button className={styles.searchTrigger} onClick={() => setIsSearchOpen(true)}>
              {/* <Search size={18} className={styles.searchIcon} /> */}
              <span className={styles.searchText}>Search...</span>
              <span className={styles.shortcutHint}>Ctrl+K</span>
            </button>

            <NavLink to="/cart" className={styles.cartBtn}>
              <ShoppingBag strokeWidth={1.5} size={22} />
              {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Render the Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
