const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        validate: {
            validator: (value) => {
                return /^[a-zA-Z]{2,15}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid name`
            }
        },

        email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required"],
        validate: {
            validator: (value) => {
                return /^([\w-.]{3,})+@([\w-.]{3,15})+.([a-zA-Z]{2,3})$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
            }
        },

        address: {
            type: String
        },

        phone: {
            type: Number,
            validate: {
                validator: (value) => {
                    if (typeof value === 'null' || 'undefined' || ' ') {
                        let value = 2341234567890
                        return /^(\d{3})+(\d{3})+(\d{3})+(\d{4})$/.test(value)
                    } else {
                        return /^(\d{3})+(\d{3})+(\d{3})+(\d{4})$/.test(value)
                    }
                },
                message: problem => `${problem.value} is not valid`
            }
        },

        password: {
        type: String,
        required: [true, "Password is required"]
        },

        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: "Cart"
            }
        ],

        order: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order"
            },
        ],
        
        role: {
             type: String,
             trim: true,
             enum: ["user", "admin"],
             default: "user"
        }
    },
    
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Users', userSchema)