const sampleProducts = [
    {
        title: "Amazon Echo Dot (3rd Gen)",
        category: "Electronics",
        price: 49.99,
        stock: 25,
    },
    {
        title: "Walmart great value Olive Oil",
        category: "Grocery",
        price: 8.99,
        stock: 100,
    },
    {
        title: "Apple iPhone 16",
        category: "Mobiles",
        price: 999.99,
        stock: 10,
    },
    {
        title: "HP Pavilion Gaming Laptop",
        category: "Laptops",
        price: 799.99,
        stock: 5,
    },
];

const sampleSales = [
    {
        product: "Amazon Echo Dot (3rd Gen)",
        quantity: 2,
        saleDate: new Date("2023-10-01"),
        reference: "Amazon",
    },
    {
        product: "Walmart great value Olive Oil",
        quantity: 5,
        saleDate: new Date("2024-10-02"),
        reference: "Walmart",
    },
    {
        product: "Apple iPhone 16",
        quantity: 2,
        saleDate: new Date("2025-02-25"),
        reference: "Amazon",
    },
    {
        product: "HP Pavilion Gaming Laptop",
        quantity: 2,
        saleDate: new Date("2025-03-20"),
        reference: "Walmart",
    },
];

module.exports = { sampleProducts, sampleSales }