const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    change: {
        type: String,
    },
    reason: {
        type: String,
    },
    changedAt: {
        type: Date,
        default: Date.now(),
    }
});

inventorySchema.index({ product: 1 });
inventorySchema.index({ changedAt: 1 });

const Inventory = new mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;