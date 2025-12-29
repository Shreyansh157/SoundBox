import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Tag, Plus, Pencil, Trash2, X, Check, Search, Upload, Lock, LogOut } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import { useInventory } from "../context/InventoryContext";
import styles from "./Admin.module.css";

const Admin = () => {
  const { products, categories, deleteProduct, addProduct, updateProduct, deleteCategory, addCategory, updateCategory } = useInventory();

  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Check LocalStorage on Mount
  useEffect(() => {
    const auth = localStorage.getItem("sb_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    // SIMPLE CREDENTIALS (You can change these)
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("sb_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid ID or Password");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("sb_admin_auth");
    setUsername("");
    setPassword("");
  };
  // ------------------

  const [activeTab, setActiveTab] = useState("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Filter Products
  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Open Modal (Reset or Populate)
  const openModal = (item = null) => {
    setEditingItem(item);

    // 1. Reset Form
    setName("");
    setPrice("");
    setDescription("");
    setImagePreview("");
    setImageFile(null);
    setCategory(categories[0]?.name || "Speakers");

    // 2. Populate if Editing
    if (item) {
      setName(item.name);
      setDescription(item.description || "");

      // Handle Image Preview (Check if it's a URL or relative path)
      if (item.image) {
        const imgUrl = item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`;
        setImagePreview(imgUrl);
      }

      // Product-specific fields
      if (activeTab === "products") {
        setPrice(item.pricePerDay || item.price);
        setCategory(item.category);
      }
    }
    setIsModalOpen(true);
  };

  // Handle File Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Local preview
    }
  };

  // Submit Form (Handles both Products and Categories)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData (Required for File Uploads)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // Only append image if a NEW file was selected
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (activeTab === "products") {
      // Product Specific Data
      formData.append("pricePerDay", price);
      formData.append("category", category);

      if (editingItem) {
        await updateProduct(editingItem._id, formData);
      } else {
        await addProduct(formData);
      }
    } else {
      // Category Specific Data
      if (editingItem) {
        await updateCategory(editingItem._id, formData);
      } else {
        await addCategory(formData);
      }
    }
    setIsModalOpen(false);
  };

  // --- RENDER LOGIN IF NOT AUTHENTICATED ---
  if (!isAuthenticated) {
    return (
      <div className={styles.wrapper}>
        <Navbar />
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <Lock size={32} className={styles.lockIcon} />
              <h2>Admin Access</h2>
              <p>Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.group}>
                <label>Admin ID</label>
                <input type="text" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
              </div>
              <div className={styles.group}>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>

              {loginError && <div className={styles.errorMsg}>{loginError}</div>}

              <button type="submit" className={styles.submitBtn}>
                Login to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD IF AUTHENTICATED ---
  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={`container ${styles.adminContainer}`}>
        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Admin Panel</h2>
            <span className={styles.badge}>Admin</span>
          </div>

          <nav className={styles.nav}>
            <button className={`${styles.navItem} ${activeTab === "products" ? styles.active : ""}`} onClick={() => setActiveTab("products")}>
              <Package size={20} /> Products
            </button>
            <button className={`${styles.navItem} ${activeTab === "categories" ? styles.active : ""}`} onClick={() => setActiveTab("categories")}>
              <Tag size={20} /> Categories
            </button>
          </nav>

          {/* Logout Button */}
          <div style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{activeTab === "products" ? "Product Management" : "Category Management"}</h1>
            <button className={styles.addBtn} onClick={() => openModal()}>
              <Plus size={20} /> Add New
            </button>
          </div>

          {activeTab === "products" ? (
            /* PRODUCT TAB */
            <>
              <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                  <Search size={18} />
                  <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className={styles.stats}>
                  <span>{products.length} Total Items</span>
                </div>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id || product.id}>
                        <td>
                          <div className={styles.productCell}>
                            <img
                              src={product.image && product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`}
                              alt=""
                              className={styles.thumb}
                            />
                            <div>
                              <strong>{product.name}</strong>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={styles.catBadge}>{product.category}</span>
                        </td>
                        <td>${product.pricePerDay || product.price}/day</td>
                        <td>
                          <button className={styles.actionBtn} onClick={() => openModal(product)}>
                            <Pencil size={16} />
                          </button>
                          <button className={styles.deleteBtn} onClick={() => deleteProduct(product._id)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* CATEGORY TAB */
            <div className={styles.grid}>
              {categories.map((cat) => (
                <div key={cat._id} className={styles.catCard}>
                  <img
                    src={cat.image && cat.image.startsWith("http") ? cat.image : `http://localhost:5000${cat.image}`}
                    alt={cat.name}
                    style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px 4px 0 0", marginBottom: "10px" }}
                  />
                  <div className={styles.catHeader}>
                    <h3>{cat.name}</h3>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button onClick={() => openModal(cat)} className={styles.actionBtn}>
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteCategory(cat._id)} className={styles.deleteBtn}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p>{cat.description}</p>
                  <span className={styles.countBadge}>{products.filter((p) => p.category === cat.name).length} Products</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modal} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className={styles.modalHeader}>
                <h2>
                  {editingItem ? "Edit" : "Add"} {activeTab === "products" ? "Product" : "Category"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                {/* 1. SHARED FIELDS */}
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label>Name</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>

                {/* 2. PRODUCT ONLY FIELDS */}
                {activeTab === "products" && (
                  <div className={styles.row}>
                    <div className={styles.group}>
                      <label>Price (Daily)</label>
                      <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className={styles.group}>
                      <label>Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((c) => (
                          <option key={c._id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* 3. IMAGE UPLOAD (SHARED) */}
                <div className={styles.group}>
                  <label>{activeTab === "products" ? "Product Image" : "Category Cover Image"}</label>

                  <div className={styles.urlInput}>
                    {/* Hidden Input */}
                    <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />

                    {/* Custom Button */}
                    <button
                      type="button"
                      className={styles.uploadBtn}
                      onClick={() => document.getElementById("fileInput").click()}
                      style={{ width: "100%", display: "flex", justifyContent: "center", gap: "8px" }}
                    >
                      <Upload size={16} />
                      {imageFile ? "Change Image" : "Upload Image"}
                    </button>
                  </div>

                  {/* Preview */}
                  {imagePreview && (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", border: "1px solid #eee" }}
                      />
                    </div>
                  )}
                </div>

                {/* 4. DESCRIPTION (SHARED) */}
                <div className={styles.group}>
                  <label>Description</label>
                  <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Check size={18} /> {editingItem ? "Update" : "Save"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
