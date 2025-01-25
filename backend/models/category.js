const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 50
        },
        slug: {
            type: String,
        },
        image: {
            type: String,
            maxLength: 200,
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
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;