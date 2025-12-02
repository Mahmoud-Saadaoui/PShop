# PShop 🛒 - MERN eCommerce Platform
## 📄 Description
ProShop is a full-featured eCommerce platform built with the MERN stack (MongoDB, Express, React, Node.js) and Redux Toolkit for state management.<br>
It allows users to browse products, manage a shopping cart, leave reviews, and complete a checkout with integrated PayPal/credit card payments. Admins can manage products, orders, and users efficiently.<br>
💡 Enhancement: Product images are stored in Cloudinary for fast, scalable, and secure storage.<br>
## ✨ Features
### 👤 User Features
Browse products with search, pagination, and top product carousel<br>
View detailed product pages with reviews and ratings<br>
Add products to a shopping cart with quantity management<br>
Complete checkout including shipping and payment<br>
PayPal and credit/debit card integration<br>
User profile page with order history<br>
Secure authentication using JWT stored in HTTP-only cookies<br>
### 🛠 Admin Features
Manage products (create, update, delete)<br>
Manage users (view, edit, delete)<br>
Manage orders with detailed view<br>
Mark orders as delivered<br>
Admin dashboard with stats and insights<br>
### ⚡ Technical Highlights
React functional components & hooks<br>
React-Bootstrap for responsive UI<br>
Redux Toolkit for global state management<br>
Express backend APIs<br>
MongoDB & Mongoose for database modeling<br>
JWT authentication and custom middleware<br>
Custom error handling<br>
Environment variables for secure configuration<br>
Cloudinary integration for image storage<br>
Ready for deployment<br>
## 💻 Installation
```
# Clone the repository
git clone <your-repo-url>

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install

# Create a .env file in backend with your MongoDB URI, JWT secret, and Cloudinary credentials
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PAGINATION_LIMIT=add_products_number_per_page
CLIENT_DEVELOPMENT_DOMAIN=http://localhost:3000

# Run the development server
cd backend
npm run backend

cd frontend
npm frontend

# Open in browser
http://localhost:3000
```