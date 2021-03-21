const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema(
    {
        orderID: {
            type: String,
            required: true,
        },

        items: [
            {
            type: Schema.Types.ObjectId,
            ref: "Food",
            },
        ],
        
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