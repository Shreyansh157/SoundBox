import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useInventory } from "../../context/InventoryContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { totalItems } = useCart();
  const { categories } = useInventory();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/equipment?search=${e.target.value}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        {/* 1. LEFT: Logo */}
        <div className={styles.logo}>
          <NavLink to="/">Raagadjaudio</NavLink>
        </div>

        {/* 2. CENTER: Links (Absolutely Positioned) */}
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
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input type="text" placeholder="Search..." onKeyDown={handleSearch} />
          </div>

          <NavLink to="/cart" className={styles.cartBtn}>
            <ShoppingBag strokeWidth={1.5} size={22} />
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
