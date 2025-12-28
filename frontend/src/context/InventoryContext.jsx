import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from "../data/data";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  // 1. Initialize State (Load from LocalStorage or use Data.js defaults)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("sb_products");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("sb_categories");
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // 2. Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("sb_products", JSON.stringify(products));
    localStorage.setItem("sb_categories", JSON.stringify(categories));
  }, [products, categories]);

  // --- CRUD OPERATIONS ---

  // Products
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() }; // Generate ID
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Categories
  const addCategory = (category) => {
    const newCategory = { ...category, id: Date.now() };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
