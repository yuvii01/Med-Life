const mongoose = require('mongoose');
const MediSchema = new mongoose.Schema(
    {
        Med_id: {
            type: mongoose.Schema.ObjectId,
            ref: "med_id"
        },
        name: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            default: 1
        } , 
        date : {
            type: Date,
            default: Date.now
        } , 
        timing :{
            type: String,
            required : true
        } ,
        image :{
            type: String,
            required : true
        } ,
        isTrue : {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Medi = mongoose.model("Medi", MediSchema);
module.exports = Medi;