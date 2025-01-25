
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        shipping_details: {
            type: Object,
        },
        product_details: [{
            type: Object,
        }],
        order_total: {
            type: Number,
        },
        payment_mode: {
            type: Number,
            enum: [1, 2],
        },
        order_status: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            default: 1
        },
        transaction_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        }

    },
    {
        timestamps: true
    }
)
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;