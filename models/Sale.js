const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
    },
    saleDate: {
        type: Date,
        default: Date.now(),
    },
    reference: {
        type: String,
        enum: ['Amazon', 'Walmart'],
    },
});

saleSchema.index({ product: 1 });
saleSchema.index({ saleDate: 1 });

const Sale = new mongoose.model('Sale', saleSchema);
module.exports = Sale;