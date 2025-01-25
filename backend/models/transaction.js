const mongoose = require('mongoose');

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Referencing the Order model
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        enum: [-1, 2], // Enumerated field with values -1 and 2
        required: true
    },
    payment_status: {
        type: Boolean,
        default: false // Defaulting to false
    },
    razorpayResponse: {
        type: Object,
        default: null // Defaulting to null
    }
},{
    timestamps :true
});

// Create Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
