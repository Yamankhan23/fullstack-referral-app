
# 🎯 Full Stack Referral System  

A modern **MERN-based Referral Management Application** that enables users to **register, log in, generate referral codes, earn credits**, and **make purchases** through an interactive dashboard — built for smooth user experience and maintainable architecture.  

![System Architecture](https://github.com/Yamankhan23/fullstack-referral-app/blob/main/SYSTEM_DATA-FLOW_UML.png?raw=true)

---

## 📖 Description  

This project is a **complete referral and rewards system** built using **Next.js (React) and Node.js/Express with MongoDB**.  
It allows users to create accounts, share referral codes, track referrals, and earn credits through purchases.  

The goal is to simulate a **real-world referral-based commerce system** while maintaining clean backend logic and responsive frontend design.  
It demonstrates strong understanding of **authentication**, **state management (Zustand)**, **REST API integration**, and **credit transaction workflows**.

---

## 🧭 Table of Contents  

- [Description](#-description)  
- [Installation](#-installation)  
- [Usage](#-usage)  
- [Features](#-features)  
- [Technologies Used](#-technologies-used)  
- [API Documentation](#-api-documentation)  
- [Deployment](#-deployment)  
- [License](#-license)  
- [Contact](#-contact)  
- [Acknowledgments](#-acknowledgments)  

---

## ⚙️ Installation  

### Prerequisites  
Ensure you have installed:  
- **Node.js** (v16 or later)  
- **npm** or **yarn**  
- **MongoDB** (local or cloud via MongoDB Atlas)  

### Steps  

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yamankhan23/fullstack-referral-app.git
   cd fullstack-referral-app
````

2. **Install dependencies for both backend and frontend**

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in `/backend` with:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=4000
   ```

4. **Run the backend**

   ```bash
   cd backend
   npm start
   ```

5. **Run the frontend**

   ```bash
   cd frontend
   npm run dev
   ```

6. Visit **[http://localhost:3000](http://localhost:3000)** to view the app.

---

## 🚀 Usage

1. Register a new user or log in.
2. Copy your unique **referral code** or **referral link**.
3. Share it with friends.
4. When your referrals make a purchase, both accounts earn **credits**.
5. Track credits and referrals in your dashboard.
6. Browse and buy from the **in-built Store Section** — purchases trigger referral logic.

---

## 🌟 Features

✅ User registration and login with JWT authentication
✅ Referral link & code generation
✅ Dashboard with user credits and referral summary
✅ Store section with live product cards and “Buy Now” simulation
✅ Credits auto-update after successful referral-based purchase
✅ Elegant and responsive UI (Tailwind + modern palette)
✅ Secure backend with transaction-safe credit updates
✅ Modular structure (clear separation of frontend/backend)

---

## 🧩 Technologies Used

**Frontend:**

* Next.js (React Framework)
* TypeScript
* Tailwind CSS
* Zustand (State Management)
* Axios

**Backend:**

* Node.js & Express.js
* MongoDB with Mongoose ORM
* JWT Authentication
* RESTful API Architecture

---

## 📡 API Documentation

| Endpoint             | Method | Description                                                     |
| -------------------- | ------ | --------------------------------------------------------------- |
| `/api/auth/register` | POST   | Registers a new user                                            |
| `/api/auth/login`    | POST   | Authenticates and returns a JWT token                           |
| `/api/dashboard`     | GET    | Fetches user stats (credits, referrals, summary)                |
| `/api/purchases/buy` | POST   | Simulates product purchase and triggers referral credit updates |

📘 *Each endpoint validates authentication using JWT middleware before processing.*

---

## 🛠️ Deployment

* **Frontend:** Deployed on platform **Netlify**
* **Backend:** Deployed on **Render**
* **Database:** Hosted on **MongoDB Atlas**

To deploy:

```bash
npm run build
npm start
```

Ensure you update `API_BASE_URL` in `frontend/lib/api.ts` to your deployed backend URL.

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute with attribution.

---

## 👤 Contact

**Author:** [Khan Yaman](https://github.com/Yamankhan23)
📧 **Email:** [yamankhan.dev@gmail.com](mailto:khanyaman2000@gmail.com)
💼 **LinkedIn:** [linkedin.com/in/yamankhan23](https://linkedin.com/in/yamankhan23)

---

## 🙏 Acknowledgments

Special thanks to:

* **Unsplash** for open-access product imagery
* **OpenAI ChatGPT** for assisting in refining system logic and architecture
* The **MERN Stack Community** for continuous inspiration

---

⭐ *If you found this project helpful, consider starring the repo!*

```

---

Would you like me to slightly **add a short 2-line tagline** under the title (for recruiter appeal, e.g., “Smart referral system built with clean architecture and real-world logic”)?
```
