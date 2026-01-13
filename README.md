# 💰 MERN Expense Tracker Application

A full-stack **Expense Tracker Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
This application allows users to securely manage their expenses with authentication, analytics, reports, and history tracking.

---

## 🚀 Features

- 🔐 User Authentication (Login & Signup using JWT)
- 💸 Add, Update, and Delete Expenses
- 👤 User-Specific Expense Tracking
- 📊 Expense Reports & Analytics
- 🕒 Date & Time History of Expenses
- 📅 Monthly Expense Analysis
- 🔒 Protected Routes (Frontend & Backend)
- ⚡ REST API Integration
- 🎯 ATS-Friendly UI Design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS (ATS-Friendly UI)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---
## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## 🔗 API Endpoints

### Auth Routes
- **POST** `/api/auth/register` – Register a new user  
- **POST** `/api/auth/login` – Login user and generate JWT  

### Expense Routes (Protected)
- **POST** `/api/expense/post` – Add a new expense  
- **GET** `/api/expense/get` – Fetch logged-in user expenses  
- **PUT** `/api/expense/update/:id` – Update an existing expense  
- **DELETE** `/api/expense/delete/:id` – Delete an expense  

---

## 📊 Reports & Analytics

- Total Expenses Calculation  
- Total Number of Expense Entries  
- Highest Expense Analysis  
- Monthly Expense Chart  
- Expense Date & Time History  

---

## 🧠 Key Learnings

- JWT-based Authentication & Authorization  
- Protected Routes using Middleware  
- Axios Interceptors for Token Handling  
- MongoDB Schema & Data Modeling  
- User-Specific Data Filtering  
- React Hooks (`useState`, `useEffect`)  
- RESTful API Design & Integration  

---

## 📌 Future Enhancements

- Download Expense Reports (PDF / CSV)  
- Advanced Charts (Category-wise Analysis)  
- Dark Mode UI  
- Mobile Responsive Design  
