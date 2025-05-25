const express = require('express');
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { getInventoryStatus, updateInventory, getInventoryHistory } = require('../controllers.js/inventoryController');

const router = express.Router();

router.get('/status', getInventoryStatus);

router.put('/update', [
    body('productId').notEmpty().withMessage('ProductId is required'),
    body('quantity').notEmpty().withMessage('Quantity is required').isInt().withMessage('Quntity must be integer'),
    body('reason').optional().isString().withMessage('Reason must be string'),
], validate, updateInventory);

router.get('/history/:id', [
    param('id').notEmpty().withMessage('ProductId is required').isMongoId().withMessage('Invalid ProductId'),
], validate, getInventoryHistory);

module.exports = router;