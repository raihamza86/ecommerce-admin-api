const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: { type: String },
    price: { type: Number },
    stock: { type: Number },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

productSchema.index({ category: 1 });

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;