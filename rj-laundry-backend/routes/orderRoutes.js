const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const db = require('../config/db');

router.post('/', (req, res) => {
    const { user_id, service_id, quantity, total_amount, pickup_address, delivery_address } = req.body;

    if (!user_id || !service_id || !quantity || !total_amount) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    Order.createOrder({ user_id, total_amount, pickup_address, delivery_address }, (err, order) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Failed to create order" });
        }

        Order.addOrderItem(order.order_id, service_id, quantity, total_amount, (err) => {
            if (err) console.error("Add item error:", err);
            res.json({
                success: true,
                message: "Order placed successfully!",
                order_number: order.order_number
            });
        });
    });
});

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


// Track specific order
router.get('/track', (req, res) => {
    const orderNumber = req.query.order_number;
    console.log("Track request for order:", orderNumber);

    if (!orderNumber) {
        return res.status(400).json({ success: false, message: "Order number required" });
    }

    const sql = `SELECT * FROM orders WHERE order_number = ?`;
    db.query(sql, [orderNumber], (err, results) => {
        if (err) {
            console.error("Track error:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, data: results[0] });
    });
});
module.exports = router;