const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    date: { type: Date, default: Date.now }
});

// const Order = mongoose.model('Order', OrderSchema);

module.exports = mongoose.model('Order', OrderSchema);
