const express = require("express");
const connectToDb = require('./config/db');
require('dotenv').config();

const salesRouter = require("./routes/sale");
const productsRouter = require("./routes/product");
const inventoryRouter = require("./routes/inventory");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

connectToDb();

app.use('/api/products', productsRouter);
app.use('/api/sales', salesRouter);
app.use('/api/inventory', inventoryRouter);

app.get('/', (req, res) => {
    res.send("E-commerce Admi api is running.")
})

app.listen(PORT, () => {
    console.log("App is listing on port", PORT);
});