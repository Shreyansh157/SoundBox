import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Empty initially

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products"),
        axios.get("http://localhost:5000/api/categories"),
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // --- PRODUCT ACTIONS ---
  const addProduct = async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // --- CATEGORY ACTIONS ---
  const addCategory = async (formData) => {
    try {
      // Changed to send FormData with correct headers
      const res = await axios.post("http://localhost:5000/api/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCategories([...categories, res.data]);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const updateCategory = async (id, formData) => {
    try {
      // Changed to send FormData
      const res = await axios.put(`http://localhost:5000/api/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCategories((prev) => prev.map((c) => (c._id === id ? res.data : c)));
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
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
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
