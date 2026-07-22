const db = require('../config/db');

const Order = {
    // Get active order for dashboard
    getActiveOrder: (userId, callback) => {
        const sql = `
            SELECT o.order_id, o.order_number, o.status, o.total_amount, o.created_at,
                   GROUP_CONCAT(s.service_name SEPARATOR ', ') as services
            FROM orders o
            LEFT JOIN order_items oi ON o.order_id = oi.order_id
            LEFT JOIN services s ON oi.service_id = s.service_id
            WHERE o.user_id = ? 
              AND o.status NOT IN ('Delivered', 'Completed')
            GROUP BY o.order_id
            LIMIT 1
        `;
        db.query(sql, [userId], callback);
    },

    // Get all orders for My Orders page
    getUserOrders: (userId, callback) => {
        const sql = `
            SELECT o.*, 
                   GROUP_CONCAT(s.service_name SEPARATOR ', ') as services
            FROM orders o
            LEFT JOIN order_items oi ON o.order_id = oi.order_id
            LEFT JOIN services s ON oi.service_id = s.service_id
            WHERE o.user_id = ? 
            GROUP BY o.order_id
            ORDER BY o.created_at DESC
        `;
        db.query(sql, [userId], callback);
    },

    // Create new order
    createOrder: (orderData, callback) => {
        const { user_id, total_amount, pickup_address, delivery_address } = orderData;
        const order_number = 'RL' + Math.floor(100000 + Math.random() * 900000);

        const sql = `INSERT INTO orders 
                     (order_number, user_id, total_amount, pickup_address, delivery_address, status) 
                     VALUES (?, ?, ?, ?, ?, 'Pending')`;

        db.query(sql, [order_number, user_id, total_amount, pickup_address || 'Default Pickup', delivery_address || 'Default Delivery'], (err, result) => {
            if (err) {
                console.error("Create Order Error:", err);
                return callback(err);
            }
            callback(null, { 
                order_id: result.insertId, 
                order_number 
            });
        });
    },

    // Add item to order
    addOrderItem: (order_id, service_id, quantity, price, callback) => {
        const sql = `INSERT INTO order_items (order_id, service_id, quantity, price) VALUES (?, ?, ?, ?)`;
        db.query(sql, [order_id, service_id, quantity, price], (err) => {
            if (err) console.error("Add Order Item Error:", err);
            callback(err);
        });
    }
};

module.exports = Order;