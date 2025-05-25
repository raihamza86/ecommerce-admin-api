const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

const getInventoryStatus = async (req, res) => {
    try {
        const lowStock = 10;
        const products = await Product.find({});

        const lowStockItems = products.filter((p) => p.stock < lowStock);

        res.status(200).json({ allProducts: products, lowStock: lowStockItems })
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Inventory Data' });
    }
};

const updateInventory = async (req, res) => {
    try {
        const { productId, quantity, reason } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $inc: { stock: quantity } },
            { new: true },
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        };

        const inventory = new Inventory({
            product: productId,
            change: quantity > 0 ? `+${quantity}` : `${quantity}`,
            reason: reason || 'Update it manually',
        });

        await inventory.save();

        res.status(200).json({ message: "Product Stock updated", product: updatedProduct })
    } catch (err) {
        res.status(500).json({ error: "Failed to update Stock" });
    }
};

const getInventoryHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await Inventory.find({ product: id });
        res.status(200).json(inventory);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch inventry History." });
    }
};

module.exports = { getInventoryStatus, updateInventory, getInventoryHistory }