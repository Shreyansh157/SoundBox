import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Notification State
  const [notification, setNotification] = useState(null);

  // 2. Load cart
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("soundbox_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 3. Save cart
  useEffect(() => {
    localStorage.setItem("soundbox_cart", JSON.stringify(cart));
  }, [cart]);

  // 4. Add Item with Notification
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      // Trigger Notification
      setNotification(`${product.name} added to cart!`);
      // Clear after 3 seconds
      setTimeout(() => setNotification(null), 3000);

      if (existing) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 5. Remove Item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Keep your existing + / - logic if you added it, or use this base
  const increaseQuantity = (id) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)));
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        notification, // Export this
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
