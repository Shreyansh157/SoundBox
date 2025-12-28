# SoundBox Rentals - Equipment Rental Platform

A full-stack e-commerce platform for renting professional audio and visual equipment. Features include a dynamic product catalog, shopping cart, admin dashboard for inventory management, and automated email notifications.

## 🚀 Features

- **Product Catalog:** Browse speakers, mics, DJ gear, and lighting with category filtering.
- **Rental Cart:** Add items, select rental duration, and request quotes.
- **Admin Dashboard:** Add, edit, and delete products/categories with image uploads.
- **Email Notifications:** Automated invoices sent to customers and notifications to the owner (via Ethereal for testing).
- **Contact Form:** Functional inquiry form with auto-replies.

---

## 💻 Tech Stack

### Frontend

- **Framework:** React.js (Vite)
- **Styling:** CSS Modules
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Image Uploads:** Multer (Local storage)
- **Email Service:** Nodemailer (SMTP / Ethereal)

---

## 🛠️ Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Compass installed for viewing data)

---

## ⚙️ Installation & Setup

### 1. Clone/Download the Repository

Download the project folder and open it in your code editor (VS Code).

### 2. Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

### 3. Frontend Setup

Open a new terminal (keep the backend one open) and navigate to the frontend folder:

```bash
cd frontend
npm install
```

### 4. 🔑 Configuration (.env)

You need to create a configuration file for the backend to work.

1. Navigate to the backend/ folder.
2. Create a new file named .env.
3. Copy and paste the following content into it:
4. Note: If you don't have Ethereal credentials, run node get-ethereal-account.js inside the backend folder to generate them instantly.

```
PORT=5000
# MongoDB Connection (Localhost)
MONGO_URI=mongodb://127.0.0.1:27017/soundbox_rental

# Email Service (Ethereal Test Account)
# These are test credentials.
EMAIL_USER=put_your_ethereal_user_here
EMAIL_PASS=put_your_ethereal_password_here
```

### 5. 🗄️ Database Setup (Seeding)

To populate the website with initial products (Speakers, Mics, etc.) and categories, run the seed script.

1. Ensure MongoDB is running.
2. In your backend terminal, run:

```Bash
node seed.js
```

### 6. ▶️ Running the Application

You need to run both the Backend and Frontend servers simultaneously.

**1. Start Backend Server**  
In the backend terminal:

```bash
npm start
```

Output: 🚀 Server running on port 5000 & ✅ MongoDB Connected

**2. Start Frontend Server**  
In the frontend terminal:

```Bash
npm run dev
Output: ➜ Local: http://localhost:5173/
```

Open http://localhost:5173 in your browser to view the site.
