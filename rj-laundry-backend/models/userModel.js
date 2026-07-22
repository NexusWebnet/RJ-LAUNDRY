const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    register: (userData, callback) => {
        const { full_name, email, phone, password } = userData;
        
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return callback(err);
            
            const sql = `INSERT INTO users (full_name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, 'customer')`;
            
            db.query(sql, [full_name, email, phone, hash], (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            });
        });
    },

    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql, [email], callback);
    },

    // Add this login method
    login: (email, password, callback) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql, [email], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null);

            const user = results[0];
            bcrypt.compare(password, user.password_hash, (err, isMatch) => {
                if (err) return callback(err);
                if (!isMatch) return callback(null, null);
                callback(null, user);
            });
        });
    }
};

module.exports = User;