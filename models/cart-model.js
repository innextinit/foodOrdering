const mongoose = require("mongoose")
const Schema = mongoose.Schema


const cartSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },

    foodId: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
     },
    
     qty: {
        type: Number,
        require: true
     }
  }
)

module.exports = mongoose.model('Cart', cartSchema)