const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET Profile by user ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const [rows] = await db.execute(`
            SELECT 
                u.user_id, 
                u.full_name, 
                u.email, 
                u.phone,
                c.address, 
                c.city, 
                c.state, 
                c.postal_code
            FROM users u
            LEFT JOIN customers c ON u.user_id = c.user_id
            WHERE u.user_id = ?
        `, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// UPDATE Profile
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { full_name, phone, email, address, city, state } = req.body;

        // Update users table
        await db.execute(
            `UPDATE users SET full_name = ?, phone = ?, email = ? WHERE user_id = ?`,
            [full_name, phone, email, userId]
        );

        // Check if customer exists
        const [existing] = await db.execute(
            `SELECT customer_id FROM customers WHERE user_id = ?`,
            [userId]
        );

        if (existing.length > 0) {
            await db.execute(
                `UPDATE customers SET address = ?, city = ?, state = ? WHERE user_id = ?`,
                [address, city, state, userId]
            );
        } else {
            await db.execute(
                `INSERT INTO customers (user_id, address, city, state) VALUES (?, ?, ?, ?)`,
                [userId, address, city, state]
            );
        }

        res.json({ message: 'Profile updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
});

module.exports = router;