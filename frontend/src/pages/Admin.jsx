import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, Tag, Plus, Pencil, Trash2, X, Check, Search, Upload } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import { useInventory } from "../context/InventoryContext";
import styles from "./Admin.module.css";

const Admin = () => {
  const { products, categories, deleteProduct, addProduct, updateProduct, deleteCategory, addCategory } = useInventory();

  const [activeTab, setActiveTab] = useState("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    tag: "",
    description: "",
  });

  // Filter Logic
  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const openModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData({ name: "", price: "", category: categories[0]?.name || "", image: "", tag: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "products") {
      if (editingItem) {
        updateProduct(editingItem.id, formData);
      } else {
        addProduct({ ...formData, price: Number(formData.price) });
      }
    } else {
      // Category Logic (Simplified for demo)
      addCategory({ name: formData.name, desc: formData.description });
    }
    setIsModalOpen(false);
  };

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
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{activeTab === "products" ? "Product Management" : "Category Management"}</h1>
            <button className={styles.addBtn} onClick={() => openModal()}>
              <Plus size={20} /> Add New
            </button>
          </div>

          {activeTab === "products" && (
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
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className={styles.productCell}>
                            <img src={product.image} alt="" className={styles.thumb} />
                            <div>
                              <strong>{product.name}</strong>
                              <span className={styles.id}>#{product.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={styles.catBadge}>{product.category}</span>
                        </td>
                        <td>${product.price}/day</td>
                        <td>
                          <span className={styles.statusBadge}>Active</span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button className={styles.actionBtn} onClick={() => openModal(product)}>
                            <Pencil size={16} />
                          </button>
                          <button className={styles.deleteBtn} onClick={() => deleteProduct(product.id)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "categories" && (
            <div className={styles.grid}>
              {categories.map((cat) => (
                <div key={cat.id} className={styles.catCard}>
                  <div className={styles.catHeader}>
                    <h3>{cat.name}</h3>
                    <button onClick={() => deleteCategory(cat.id)} className={styles.deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p>{cat.desc || "No description provided"}</p>
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
                <h2>{editingItem ? "Edit Product" : "Add New Product"}</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label>Name</label>
                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className={styles.group}>
                    <label>Price (Daily)</label>
                    <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.group}>
                    <label>Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.group}>
                    <label>Tag (Optional)</label>
                    <input value={formData.tag} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} />
                  </div>
                </div>

                <div className={styles.group}>
                  <label>Image URL</label>
                  <div className={styles.urlInput}>
                    <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                    <button type="button" className={styles.uploadBtn}>
                      <Upload size={16} />
                    </button>
                  </div>
                </div>

                <div className={styles.group}>
                  <label>Description</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Check size={18} /> Save Changes
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
