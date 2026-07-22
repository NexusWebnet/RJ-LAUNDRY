const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Get active order
router.get('/active', (req, res) => {
    const userId = req.query.user_id;

    console.log("Received user_id:", userId); // Debug

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    Order.getActiveOrder(userId, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Server error" });
        
        if (results.length === 0) {
            return res.json({ success: true, data: null, message: "No active order" });
        }

        res.json({ success: true, data: results[0] });
    });
});

// Get all orders
router.get('/', (req, res) => {
    const userId = req.query.user_id;

    console.log("Received user_id for all orders:", userId); // Debug

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    Order.getUserOrders(userId, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Server error" });
        res.json({ success: true, data: results });
    });
});

module.exports = router;