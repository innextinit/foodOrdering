const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
        },

        items: [
            {
            type: Array,
            required: true,
            },
        ],

        address: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true
        },
        
        totalAmount: {
            type: Number,
            required: true,
        },
        
        orderDate: {
            type: Date,
        },
        
        paidThrough: {
            //card
            type: String,
        }
    }
)

module.exports = mongoose.model("Order", orderSchema)