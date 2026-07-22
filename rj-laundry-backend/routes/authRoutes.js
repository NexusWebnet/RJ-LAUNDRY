const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', (req, res) => {
    const { full_name, email, phone, password } = req.body;

    if (!full_name || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    User.findByEmail(email, (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        User.register({ full_name, email, phone, password }, (err, result) => {
            if (err) return res.status(500).json({ message: "Server error" });
            res.status(201).json({ message: "Registration successful!" });
        });
    });
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    User.login(email, password, (err, user) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        res.json({
            message: "Login successful",
            user: {
                id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    });
});
module.exports = router;