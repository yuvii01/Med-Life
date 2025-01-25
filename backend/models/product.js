const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        discount_percent: {
            type: Number,
            default: 0
        },
        discount_price: {
            type: Number,
        },
        image: {
            type: String,
        },
        category_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        }, 
        status: {
            type: Boolean,
            default: true
        },
        color: [{
            type: mongoose.Schema.ObjectId,
            ref: "Color"
        }],
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;