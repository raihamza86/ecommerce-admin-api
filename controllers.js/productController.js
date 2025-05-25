
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching Products' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, category, price, stock } = req.body;
        const newProduct = new Product({ title, category, price, stock });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully!', product: newProduct })
    } catch (err) {
        res.status(500).json({ error: 'Failed to create Product' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found.." });
        };

        res.status(200).json({ message: "Product is updated successfully!", product: updatedProduct })

    } catch (err) {
        res.status(500).json({ error: "Failed to update product" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const delProduct = await Product.findByIdAndDelete(id);

        if (!delProduct) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.status(200).json({ message: "Product is deleted successfully!" })
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product" });
    }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct }