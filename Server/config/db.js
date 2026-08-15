const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Your database URL pointing to bakery_db
        await mongoose.connect('mongodb://127.0.0.1:27017/bakery_db');
        console.log('Successfully connected to MongoDB via Mongoose');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
