import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Load cart from localStorage so items don't disappear on refresh
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("soundbox_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Save to localStorage automatically whenever cart changes
  useEffect(() => {
    localStorage.setItem("soundbox_cart", JSON.stringify(cart));
  }, [cart]);

  // 3. Add Item Function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        // If item exists, increase quantity
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      // If new, add to cart
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 4. Remove Item Function
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
