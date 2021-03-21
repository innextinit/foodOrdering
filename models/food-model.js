const mongoose = require("mongoose")
const Schema = mongoose.Schema

const foodSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },
        
        images: {
            type: [String],
        }
    }
)

module.exports = mongoose.model("Food", foodSchema)