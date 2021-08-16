const User = require("../models/user-model")
const Food = require("../models/food-model")
const Order = require("../models/order-model")
const Cart = require("../models/cart-model")

class order {
    static async checkout(req, res, next) {
        try {
            const userId = req.user
            const itemsToCheckout = req.body.items
            const itemsToCheckoutSplit = itemsToCheckout.split(",")

            let totalPrice = 0
            let itemSummary = []
            for (let eachItemInUserCart = 0; eachItemInUserCart < itemsToCheckoutSplit.length; eachItemInUserCart ++) {
                const eachId = itemsToCheckoutSplit[eachItemInUserCart]

                const detailsOfItemFromCart = await Cart.findById(eachId)
                if (detailsOfItemFromCart == null) return res.status(200).json("looks like there is no user with that cart or cart is empty")
                if (detailsOfItemFromCart.userId.toString() === userId._id.toString()) {
                    const oneFood = await Food.findById(detailsOfItemFromCart.foodId)
                    const oneFoodPrice = oneFood.price
                    const foodItemQyt = detailsOfItemFromCart.qty
                    const thisFoodItemPriceWithQyt = (oneFoodPrice * foodItemQyt)
                    totalPrice += thisFoodItemPriceWithQyt
                    const jsonOfSummary = {
                        foodName: oneFood.name,
                        foodId: oneFood._id,
                        foodQyt: foodItemQyt,
                        eachFoodPrice: oneFoodPrice,
                        oneFoodPriceWithQyt: thisFoodItemPriceWithQyt
                    }
                    itemSummary.push(jsonOfSummary)
                }           
            }
            const userAddress = userId.address
            const userPhone = userId.phone

            if (userAddress == null || userAddress == undefined 
                || userPhone == null || userPhone == undefined) {
                return res.status(501).json("this checkout cant be implemented, please update your profile to have the address and phone number")
            }

            await new Order({
                orderId: userId._id,
                items: itemSummary,
                address: userAddress,
                phone: userPhone,
                totalAmount: totalPrice,
                orderDate: Date.now(),
                paidThrough: "card"
            }).save()
            
            let toDelete = []
            for (let eachItemInUserCart = 0; eachItemInUserCart < itemsToCheckoutSplit.length; eachItemInUserCart ++) {
                toDelete.push(itemsToCheckoutSplit[eachItemInUserCart])
            }
            await Cart.deleteMany({_id: {$in: toDelete}})

            return await res.status(201).json({
                address: userAddress,
                phone: userPhone,
                itemSummary: itemSummary,
                totalPrice: totalPrice
            })
        } catch (error) {
            next(error)
        }
    }

    static async orderHistroy(req, res, next) {
        const userId = req.user
        const allUserOrder = await Order.find({
            orderId: userId._id
        })
        return res.status(200).json(allUserOrder)
    }
}

module.exports = order