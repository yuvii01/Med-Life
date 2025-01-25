const mongoose = require('mongoose');
const ColorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        code: {
            type: String,
            require: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)
const Color = mongoose.model("Color", ColorSchema);
module.exports = Color;