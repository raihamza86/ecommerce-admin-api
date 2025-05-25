const mongoose = require("mongoose");
const Product = require("../models/Product");
const Sale = require("../models/Sale");
const initData = require("./data");
require('dotenv').config();

main()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce_admin");
}


const insertData = async () => {
    await Product.deleteMany({});
    await Sale.deleteMany({});

    const products = await Product.insertMany(initData.sampleProducts);

    const productObj = {};
    products.forEach((product) => {
        productObj[product.title] = product._id;
    });

    const sales = initData.sampleSales.map((sale) => ({
        ...sale,
        product: productObj[sale.product],
    }));

    await Sale.insertMany(sales);
    console.log("Data is inserted Successfully!");
};


insertData();

