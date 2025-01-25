const mongoose = require('mongoose');

// Define user schema
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true

        },
        Image: {
            type: String,
            required : true
        },
        contactNumber: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other']
        },
        status: {
            type: Boolean,
            default: true
        },
        address: [{
            type: String
        }]
    },
    {
        timestamps: true
    }

);

// Create user model
const User = mongoose.model('User', UserSchema);

module.exports = User;
