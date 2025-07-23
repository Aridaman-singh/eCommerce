# QuickCart: A Basic MERN Stack E-commerce Cart System 🛒🛍️

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

## Table of Contents
1.  [✨ Introduction](#1-introduction)
2.  [🚀 Features](#2-features)
    * [Backend (API)](#backend-api)
    * [Frontend (UI)](#frontend-ui)
3.  [🛠️ Technologies Used](#3-technologies-used)
4.  [📂 Project Structure](#4-project-structure)
5.  [⚙️ Setup Instructions](#5-setup-instructions)
    * [Prerequisites](#prerequisites)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
6.  [▶️ Usage](#6-usage)
7.  [🚧 Current Status & Future Enhancements](#7-current-status--future-enhancements)
8.  [🎁 Optional Bonus Features (Implemented/Planned)](#8-optional-bonus-features-implementedplanned)

---

## 1. ✨ Introduction

QuickCart is a foundational e-commerce cart system built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. It provides core functionalities for viewing products, adding them to a shopping cart, managing quantities, and calculating totals. This project serves as a practical demonstration of full-stack JavaScript development principles.

---

## 2. 🚀 Features

### Backend (API)

The Node.js/Express API serves as the data layer for the application, interacting with MongoDB.

* **Product Management:**
    * `POST /api/products`: Add a new product to the catalog.
    * `POST /api/products/batch`: Add multiple products to the catalog in a single request.
    * `GET /api/products`: Retrieve a list of all available products.
* **User Authentication:**
    * `POST /api/auth/register`: Register a new user with a username and password (password is hashed using `bcryptjs`).
    * `POST /api/auth/login`: Authenticate a user and return a JSON Web Token (JWT) for subsequent authenticated requests.
* **User-Specific Cart Management (Protected):**
    * `POST /api/cart`: Add a product to the authenticated user's cart. If the product already exists, its quantity is incremented.
    * `GET /api/cart`: Retrieve all products currently in the authenticated user's cart, including their quantities.
    * `DELETE /api/cart/:productId`: Decrement the quantity of a product in the authenticated user's cart. If the quantity drops to zero, the item is removed from the cart.

### Frontend (UI)

The React.js single-page application provides an intuitive user interface for interacting with the backend API.

* **Authentication Flow:**
    * Login page for existing users.
    * Registration page for new users.
    * Protected routes: Shop and Cart pages are only accessible to authenticated users.
    * Logout functionality.
* **Product Catalog:**
    * View a grid of all available products.
    * "Show More/Show Less" feature to manage the display of a large number of products, initially showing a limited set and allowing users to expand/collapse the view.
* **Add to Cart:**
    * Seamlessly add products to the cart directly from the product list.
    * Visual feedback ("Adding...", "Added!") on the button.
    * Automatically updates cart count (via event dispatch).
* **Shopping Cart View:**
    * Display all items currently in the user's cart, including product details (image, name, price) and **quantity**.
    * Buttons (`+` and `-`) to easily increment or decrement product quantities directly within the cart.
    * Automatically updates the cart total in real-time.
    * "Cart is empty" message when no items are present.
* **Responsive Design:**
    * UI is designed to adapt to various screen sizes (mobile, tablet, desktop) using Tailwind CSS.
* **User Feedback:**
    * Loading indicators for API calls.
    * Error messages for failed operations (e.g., failed login, product fetch errors).

---

## 3. 🛠️ Technologies Used

**Backend:**
* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web application framework for Node.js.
* **MongoDB:** NoSQL database for data storage.
* **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
* **JWT (jsonwebtoken):** For secure user authentication.
* **bcryptjs:** For password hashing.
* **dotenv:** For managing environment variables.
* **cors:** For enabling Cross-Origin Resource Sharing.

**Frontend:**
* **React.js:** JavaScript library for building user interfaces.
* **React Hooks:** (`useState`, `useEffect`, `useContext`) for state management and side effects.
* **React Router DOM:** For client-side routing.
* **Axios:** Promise-based HTTP client for API requests.
* **jwt-decode:** For decoding JWTs on the client-side.
* **Tailwind CSS:** Utility-first CSS framework for styling and responsiveness.
* **Google Fonts (Inter):** For modern typography.

---


## 4. ⚙️ Setup Instructions

Follow these steps to get QuickCart up and running on your local machine.

### Prerequisites

* **Node.js** (v14 or higher recommended)
* **npm** (Node Package Manager) or Yarn
* **MongoDB** instance (local or MongoDB Atlas)
* **Postman** (or similar API client for testing backend endpoints)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-link>
    cd eCommerce/server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Create `.env` file:**
    In the `server` directory, create a file named `.env` and add your MongoDB URI and a JWT secret:
    ```
    MONGO_URI=mongodb://localhost:27017/quickkart # Replace with your Atlas URI if using it
    JWT_SECRET=your_super_secret_jwt_key_here # Use a strong, random string
    ```
4.  **Start the backend server:**
    ```bash
    npm start
    # or node server.js
    ```
    The server should start on `http://localhost:5001`.

### Frontend Setup

1.  **Navigate to the client directory:**
    ```bash
    cd ../client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Start the frontend development server:**
    ```bash
    npm start
    # or yarn start
    ```
    The React app should open in your browser, typically on `http://localhost:3000`.

---

## 5. ▶️ Usage

1.  **Register a User:**
    * Open the frontend application (`http://localhost:3000`).
    * Click on the "Register" link in the header or on the login page.
    * Fill out the registration form with a username and password and submit. You should see a success message.
    * (Alternatively, you can register a user directly via Postman: `POST http://localhost:5001/api/auth/register` with `{ "username": "youruser", "password": "yourpassword" }` in JSON body).
2.  **Login:**
    * Navigate to the "Login" page.
    * Enter the credentials of the user you just registered.
    * Upon successful login, you will be redirected to the main shop page.
3.  **Browse Products:**
    * View the list of products. If there are many, use the "Show More" button to reveal more.
4.  **Add to Cart:**
    * Click the "Add to Cart" button on any product card. The cart icon/section should update automatically.
5.  **View Cart:**
    * Click the "Cart" link in the header.
    * See the items you've added, their quantities, and the total amount.
6.  **Manage Cart Quantities:**
    * Use the `+` and `-` buttons next to each item in the cart to adjust its quantity.
7.  **Logout:**
    * Click the "Logout" button in the header to clear your session.

---

## 6. 🚧 Current Status & Future Enhancements

The core functionality of the e-commerce cart, including product display, quantity management, and basic authentication, is implemented.

**Currently working on:**
* **Refining JWT integration:** Ensuring seamless token handling, expiration, and secure storage on the frontend for a robust user experience. Debugging initial login issues related to token propagation.

**Planned Future Enhancements:**
* User profiles and order history.
* Product search and filtering.
* Checkout process and payment integration.
* Admin panel for product management.
* More robust error handling and user notifications (e.g., toast messages instead of `alert()`).
* Deployment to cloud platforms (Render/Railway for backend, Vercel/Netlify for frontend).

---

## 7. 🎁 Optional Bonus Features (Implemented/Planned)

* **JWT-based dummy authentication with hardcoded users:** **Partially Implemented.** The backend endpoints for register/login and JWT generation are set up, and frontend components for login/register exist. The authentication flow is being actively refined.
* **Support cart per user using JWT:** **Implemented.** Cart operations (add, get, remove/decrement) are now tied to the authenticated `userId` via JWT.

---
