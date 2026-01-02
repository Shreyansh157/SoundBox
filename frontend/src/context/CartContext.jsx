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

  // HELPER: Get a unique ID regardless of source (Backend _id or Static id)
  const getProductId = (product) => product._id || product.id;

  // 4. Add Item with Notification
  const addToCart = (product) => {
    setCart((prevCart) => {
      const incomingId = getProductId(product);

      // Check if item exists using the helper
      const existing = prevCart.find((item) => getProductId(item) === incomingId);

      // Trigger Notification
      setNotification(`${product.name} added to cart!`);
      setTimeout(() => setNotification(null), 3000);

      if (existing) {
        return prevCart.map((item) => (getProductId(item) === incomingId ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 5. Remove Item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => getProductId(item) !== id));
  };

  // 6. Increase Quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) => prevCart.map((item) => (getProductId(item) === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  // 7. Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) => prevCart.map((item) => (getProductId(item) === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)));
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
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
