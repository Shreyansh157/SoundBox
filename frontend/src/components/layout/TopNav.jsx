import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext"; // Import hook
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart(); // Get the count

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <NavLink to="/">SoundBox.</NavLink>
        </div>

        {/* ... (Links remain the same) ... */}
        <div className={styles.desktopLinks}>
          <NavLink to="/Home" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
            About
          </NavLink>
          <NavLink to="/equipment" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
            Menu
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
            Contact
          </NavLink>
        </div>

        <div className={styles.actions}>
          <NavLink to="/cart" className={styles.cartBtn}>
            <ShoppingBag strokeWidth={1.5} size={22} />
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </NavLink>
          {/* ... Mobile Toggle ... */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
