const express = require('express');
const { body } = require("express-validator");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers.js/productController');
const validate = require('../middleware/validate');

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", [
    body('title').notEmpty().withMessage('Title is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be non-negative')
], validate, createProduct);

router.put("/:id", [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be positive'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be non-negative integer'),
], validate, updateProduct);

router.delete("/:id", deleteProduct)

module.exports = router;