const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// Place a new order
router.post('/', auth, async (req, res) => {
    const { productId } = req.body;
    console.log('Received productId:', productId);
    console.log('Authenticated user:', req.user);

    try {
        if (!productId){
            throw new Error('Product ID is required');
        }
        const newOrder = new Order({
            userId: req.user.id,
            productId
        });

        const savedOrder = await newOrder.save();
        console.log('Order saved:', savedOrder);
        res.json(savedOrder);
    } catch (err) {
        console.error('Error while placing order:', err.message);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
