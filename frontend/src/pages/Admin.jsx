// ... (Keep Imports same as before)
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Tag, Plus, Pencil, Trash2, X, Check, Search, Upload, Lock, LogOut, Calendar as CalIcon, User } from "lucide-react"; // Removed AlertTriangle
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

import Navbar from "../components/layout/TopNav";
import { useInventory } from "../context/InventoryContext";
import styles from "./Admin.module.css";

const Admin = () => {
  const { products, categories, deleteProduct, addProduct, updateProduct, deleteCategory, addCategory, updateCategory } = useInventory();

  // ... (Keep Auth State & Login Logic same) ...
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("sb_admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("sb_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid ID or Password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("sb_admin_auth");
  };

  // ... (Keep Admin State same) ...
  const [activeTab, setActiveTab] = useState("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- CALENDAR / BOOKINGS STATE ---
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Booking Form State
  const [bookingProduct, setBookingProduct] = useState("");
  const [bookingQty, setBookingQty] = useState(1);
  const [bookingDays, setBookingDays] = useState(1);
  const [bookingName, setBookingName] = useState("");

  // ... (Keep fetchBookings, handleAddBooking, handleDeleteBooking same) ...
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    if (activeTab === "calendar") {
      fetchBookings();
    }
  }, [activeTab]);

  const handleAddBooking = async (e) => {
    e.preventDefault();
    if (!bookingProduct) return alert("Please select a product");

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        productId: bookingProduct,
        date: selectedDate,
        quantity: bookingQty,
        days: bookingDays,
        customerName: bookingName || "Admin Booking",
      });

      setBookingName("");
      setBookingQty(1);
      setBookingDays(1);
      fetchBookings();
    } catch (err) {
      alert("Error creating booking");
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Remove this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // ... (Keep standard form state & functions same) ...
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const openModal = (item = null) => {
    setEditingItem(item);
    setName("");
    setPrice("");
    setDescription("");
    setStock(1);
    setImagePreview("");
    setImageFile(null);
    setCategory(categories[0]?.name || "Speakers");

    if (item) {
      setName(item.name);
      setDescription(item.description || "");
      if (item.image) {
        const imgUrl = item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`;
        setImagePreview(imgUrl);
      }
      if (activeTab === "products") {
        setPrice(item.pricePerDay || item.price);
        setCategory(item.category);
        setStock(item.stock || 1);
      }
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    if (activeTab === "products") {
      formData.append("pricePerDay", price);
      formData.append("category", category);
      formData.append("stock", stock);

      if (editingItem) await updateProduct(editingItem._id, formData);
      else await addProduct(formData);
    } else {
      if (editingItem) await updateCategory(editingItem._id, formData);
      else await addCategory(formData);
    }
    setIsModalOpen(false);
  };

  // --- CALENDAR LOGIC ---
  const getBookingsForDate = (date) => {
    return bookings.filter((b) => isSameDay(new Date(b.date), date));
  };

  const selectedDateBookings = getBookingsForDate(selectedDate);

  // ... (Keep Render Logic) ...
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
                <input type="text" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
              </div>
              <div className={styles.group}>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
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
            <button className={`${styles.navItem} ${activeTab === "calendar" ? styles.active : ""}`} onClick={() => setActiveTab("calendar")}>
              <CalIcon size={20} /> Calendar
            </button>
          </nav>

          <div style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{activeTab === "products" ? "Product Management" : activeTab === "categories" ? "Category Management" : "Booking Calendar"}</h1>
            {activeTab !== "calendar" && (
              <button className={styles.addBtn} onClick={() => openModal()}>
                <Plus size={20} /> Add New
              </button>
            )}
          </div>

          {activeTab === "products" && (
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
                      <th>Stock</th>
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
                        <td>{product.stock || 1}</td>
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
          )}

          {activeTab === "categories" && (
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
                </div>
              ))}
            </div>
          )}

          {activeTab === "calendar" && (
            /* CALENDAR TAB */
            <div className={styles.calendarLayout}>
              {/* Left: Calendar Widget */}
              <div className={styles.calendarWrapper}>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className={styles.reactCalendar}
                  tileClassName={({ date, view }) => {
                    if (view === "month") {
                      const hasBookings = bookings.some((b) => isSameDay(new Date(b.date), date));
                      return hasBookings ? styles.hasOrders : null;
                    }
                  }}
                />
                <div className={styles.legend}>
                  <div className={styles.dot}></div> <span>Has Bookings</span>
                </div>
              </div>

              {/* Right: Daily Status & Add Booking */}
              <div className={styles.dayDetails}>
                <h3 className={styles.dateTitle}>{format(selectedDate, "MMMM do, yyyy")}</h3>

                {/* 1. Add Booking Form */}
                <div className={styles.addBookingBox}>
                  <h4>Add Manual Booking</h4>
                  <form onSubmit={handleAddBooking} className={styles.miniForm}>
                    <div className={styles.inputGroup}>
                      <label>Select Equipment</label>
                      <select value={bookingProduct} onChange={(e) => setBookingProduct(e.target.value)} required className={styles.miniSelect}>
                        <option value="">Choose item...</option>
                        {products.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.miniRow}>
                      <div className={styles.inputGroup}>
                        <label>Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={bookingQty}
                          onChange={(e) => setBookingQty(e.target.value)}
                          className={styles.miniInput}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Duration (Days)</label>
                        <input
                          type="number"
                          min="1"
                          value={bookingDays}
                          onChange={(e) => setBookingDays(e.target.value)}
                          className={styles.miniInput}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Customer / Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe - Wedding"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className={styles.miniInput}
                      />
                    </div>

                    <button type="submit" className={styles.miniBtn}>
                      <Plus size={14} /> Add Booking
                    </button>
                  </form>
                </div>

                {/* 2. List of Bookings */}
                <div className={styles.ordersList}>
                  <h4>📅 Bookings ({selectedDateBookings.length})</h4>
                  {selectedDateBookings.length === 0 ? (
                    <p className={styles.emptyText}>No bookings for this day.</p>
                  ) : (
                    <ul className={styles.bookingList}>
                      {selectedDateBookings.map((b) => (
                        <li key={b._id} className={styles.bookingItem}>
                          <div style={{ flex: 1 }}>
                            <strong>{b.productId?.name || "Unknown Item"}</strong>
                            <span className={styles.qtyBadge}>x{b.quantity}</span>
                            <div className={styles.bookingNote}>
                              <User size={12} /> {b.customerName}
                            </div>
                          </div>
                          <button onClick={() => handleDeleteBooking(b._id)} className={styles.trashIcon} title="Remove">
                            <Trash2 size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 3. REMOVED INVENTORY CHECK TABLE as requested */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL ... (Keep existing modal code exactly as is) ... */}
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
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label>Name</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>

                {activeTab === "products" && (
                  <div className={styles.row}>
                    <div className={styles.group}>
                      <label>Price (Daily)</label>
                      <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className={styles.group}>
                      <label>Stock Quantity</label>
                      <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} />
                    </div>
                  </div>
                )}
                {activeTab === "products" && (
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
                )}

                <div className={styles.group}>
                  <label>Image</label>
                  <div className={styles.urlInput}>
                    <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                    <button type="button" className={styles.uploadBtn} onClick={() => document.getElementById("fileInput").click()}>
                      <Upload size={16} /> {imageFile ? "Change Image" : "Upload Image"}
                    </button>
                  </div>
                  {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: "10px", height: "100px", borderRadius: "8px" }} />}
                </div>

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
