## E-commerce Admin API

This is **Backend API** for an e-commerce admin dashboard, built with **Node.js (Express)** and **MongoDB**. It helps to manage track sales, revenue, and inventory status.

## Tech Stack:
**BackEnd**: Node.js + Express
**DataBase**: MongoDB with Mongoose
**API Type**: RESTful API
**Validation**: express-validator
**Environment**: 'dotenv' for config

## Setup and Run:
1: **Clone the repo**
    git clone https://github.com/raihamza86/ecommerce-admin-api.git
    cd ecommerce-admin-api 

2: **Install Dependencies**
    npm install

3: **Setup Environment Variables**
    Create a .env file:
    MONGO_URL=your_mongodb_connection
    PORT=8080

4: **Add Demo Data into DB**
    cd init
    node index.js

5: **Start the Server**
    cd ..
    node app.js


## API Endpoints:
Products:
    GET /api/products - it will List all products
    POST /api/products - it will add a new product
    PUT /api/products/:id - it will update a product
    DELETE /api/products/:id - it will delete a product


Sale and Revenue:
    GET /api/sales - it will List all sales
    GET /api/sales/analytics/:period - it will get revenue for daily/weekly/monthly/yearly periods
    POST /api/sales/overview - it will get detailed sales overview filtered by date range, product, or category, with optional comparison to another date range


Inventory: 
    GET /api/inventory/status - it will check stock levels (with low-stock alerts)
    PUT /api/inventory/update - it will update stock quantity
    GET /api/inventory/history/:id - it will show/view stock change history

## Database Schema:
Products (Product collection):
    title, category, price, stock createdAt

Sales (Sale collection):
    product (ref), quantity, saleDate, reference (Amazon/Walmart)

Inventory (Inventory collection):
    product (ref), change, reason, changedAt

## Contact:
For questions:
rahamza186@gmail.com
