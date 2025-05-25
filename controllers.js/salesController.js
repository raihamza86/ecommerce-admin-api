const Sale = require('../models/Sale');
const Product = require('../models/Product');

const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find({});
        res.status(200).json(sales);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch Sales data." });
    }
};

const getAnalytics = async (req, res) => {
    try {
        let { period } = req.params;
        const now = new Date();

        let start;

        if (period === 'daily') {
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        } else if (period === 'weekly') {
            start = new Date(now);
            start.setDate(start.getDate() - 7);
        } else if (period === 'monthly') {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (period === 'yearly') {
            start = new Date(now.getFullYear(), 0, 1);
        } else {
            return res.status(400).json({ error: "invalid period entered" });
        }

        const sales = await Sale.find({ saleDate: { $gte: start } }).populate('product');
        const revenue = sales.reduce((sum, sale) => {
            if (sale.product && sale.product.price) {
                return sum + (sale.product.price * sale.quantity)
            }
            return sum;
        }, 0)

        res.status(200).json({ period, revenue, saleCount: sales.length });
    } catch (err) {
        res.status(500).json({ error: "Failed to see analytics" });
    }
};

const saleOverview = async (req, res) => {
    try {
        const { startDate, endDate, productId, category, compareWith } = req.body;
        let filter = {};

        if (startDate && endDate) {
            filter.saleDate = { $gte: new Date(startDate), $lte: new Date(endDate) }
        };

        if (productId) {
            filter.product = productId;
        };

        if (category) {
            const products = await Product.find({ category }).select('_id');
            filter.product = { $in: products.map((p) => p._id) }
        };

        const sales = await Sale.find(filter).populate('product');

        const totalRevenue = sales.reduce((sum, sell) => {
            return sum + (sell.product.price * sell.quantity);
        }, 0);

        const revinueByDate = {};
        sales.forEach((sale) => {
            const date = sale.saleDate.toISOString().split('T')[0];
            const revenue = sale.product.price * sale.quantity;
            revinueByDate[date] = (revinueByDate[date] || 0) + revenue;
        });

        let compare = {};
        if (compareWith && compareWith.startDate && compareWith.endDate) {
            let comFilter = {
                saleDate: {
                    $gte: new Date(compareWith.startDate),
                    $lte: new Date(compareWith.endDate),
                }
            };

            const comSales = await Sale.find(comFilter).populate('product');
            const comRevinue = comSales.reduce((sum, sell) => {
                return sum + (sell.product.price * sell.quantity);
            }, 0);

            compare = {
                comRevinue,
                difference: totalRevenue - comRevinue,
                percentageChange: ((totalRevenue - comRevinue) / (comRevinue || 1)) * 100
            };

        };

        res.status(200).json({ count: sales.length, totalRevenue, revinueByDate, compare, sales });


    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Sales Data.' })
    }
};

module.exports = { getAllSales, getAnalytics, saleOverview }