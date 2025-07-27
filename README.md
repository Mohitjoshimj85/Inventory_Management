# 🛒 Smart Inventory & Order Management System

A full-featured backend application built with **Node.js**, **Express**, and **MySQL** to manage inventory, orders, and users for small to medium-scale businesses.

---

## 🚀 Features

- 📦 **Product Management**: Add, view, update, and delete products.
- 🧾 **Order Management**: Place orders with automatic stock validation.
- 👤 **User Registration**: Basic user authentication (signup).
- 📊 **Reporting-Ready Structure**: Easily extendable for dashboard stats or reports.
- 🔐 Secure architecture (no raw SQL injections, clean separation of concerns).

---

## 🛠️ Tech Stack

| Layer        | Technology    | Why We Use It? | Alternatives |
|--------------|---------------|----------------|--------------|
| Backend      | Node.js       | Asynchronous, event-driven, scalable | Django, Laravel |
| Server Framework | Express.js | Lightweight, minimal, robust routing | Koa.js, Fastify |
| Database     | MySQL         | Reliable RDBMS, supports joins, scalable | PostgreSQL, SQLite |
| DB Driver    | mysql2        | Modern, fast, supports promises | sequelize, knex |
| API Handling | CORS          | To allow frontend-backend communication | Helmet, Proxy config |
| Tooling      | nodemon       | Auto-restarts server during dev | PM2 (production) |

---

## 📦 Project Structure

```
smart-inventory-system/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Signup logic
│   ├── productController.js
│   └── orderController.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── orders.js
├── index.js               # Main server file
├── package.json
├── README.md
└── .gitignore
```

---

## ⚙️ API Endpoints

### ✅ Auth Routes
- `POST /api/auth/signup` — Register a new user

### 📦 Product Routes
- `GET /api/products` — Get all products
- `POST /api/products` — Add a new product
- `PUT /api/products/:id` — Update product
- `DELETE /api/products/:id` — Delete product

### 🧾 Order Routes
- `GET /api/orders` — Get all orders
- `POST /api/orders` — Place an order

---

## 🧱 Database Schema

### `users`
| Column    | Type          |
|-----------|---------------|
| id        | INT, PK       |
| name      | VARCHAR(255)  |
| email     | VARCHAR(255)  |
| password  | VARCHAR(255)  |
| role      | VARCHAR(20) DEFAULT 'user' |

### `products`
| Column     | Type          |
|------------|---------------|
| id         | INT, PK       |
| name       | VARCHAR(255)  |
| description| TEXT          |
| price      | DECIMAL(10,2) |
| stock      | INT           |

### `orders`
| Column     | Type          |
|------------|---------------|
| id         | INT, PK       |
| product_id | INT, FK       |
| quantity   | INT           |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

---

## 🔧 Installation & Usage

1. **Clone the Repo**
   ```bash
   git clone https://github.com/your-username/smart-inventory-system.git
   cd smart-inventory-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Database**
   - Make sure MySQL is running
   - Create database: `inventory_db`
   - Create the tables (`products`, `orders`, `user`) as per schema

4. **Start the Server**
   ```bash
   nodemon index.js
   ```

---

## 📌 Future Improvements

- 🛡 JWT Authentication
- 🧾 PDF Invoice Generation
- 📈 Sales & Stock Reports
- 🌐 React-based Frontend
- 📬 Email Notifications

---

## 🧠 Author

**Mohit Joshi**  
📧 [harshitjoshimj85@gmail.com]  
💼 [www.linkedin.com/in/mohit-joshi-57b866293].

---

## 📄 License

This project is licensed under the MIT License.
