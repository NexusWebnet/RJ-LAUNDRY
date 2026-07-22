const db = require('./config/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);



// Routes (we'll add later)
app.get('/', (req, res) => {
    res.send('RJ Laundry Backend is Running! 🚀');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});