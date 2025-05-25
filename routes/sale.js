const express = require('express');
const { param, body } = require("express-validator");
const validate = require("../middleware/validate");
const { getAllSales, getAnalytics, saleOverview } = require('../controllers.js/salesController');

const router = express.Router();

router.get("/", getAllSales);

router.post('/overview', [
    body('startDate').optional().isISO8601().withMessage('startDate must be valid ISO 8601 date'),
    body('endDate').optional().isISO8601().withMessage('endDate must be valid ISO 8601 date'),
    body('productId').optional().isMongoId().withMessage('ProductId must be valid MongoDB Id'),
    body('category').optional().isString().withMessage('Category must be string'),
    body('compareWith').optional().isObject().withMessage('compareWith must be object'),
    body('compareWith.startDate').optional().isISO8601().withMessage('compareWith.startDate must be valid ISO 8601 date'),
    body('compareWith.endDate').optional().isISO8601().withMessage('compareWith.endDate must be valid ISO 8601 date'),
], validate, saleOverview);

router.get("/analytics/:period", [
    param('period').isIn(['daily', 'weekly', 'monthly', 'yearly']).withMessage('Period must be one of: daily, weekly, monthly, yearly')
], validate, getAnalytics);


module.exports = router;