const User = require("../models/user-model")
const Food = require("../models/food-model")
const Order = require("../models/order-model")

class order {
    static async checkout(req, res, next) {
        try {
            const userId = req.user
            const [itemsToCheckout] = req.body
            let totalPrice = ''
            let itemSummary = []

            // get price
            itemsToCheckout.forEacH( async foodItem => {
                const oneFood = await Food.findById(foodItem)
                const oneFoodPrice = oneFood.price
                const isFoodItemInCart = await userId.cart.filter((cartItem) => {
                    return cartItem.food === foodItem
                })
                const foodItemQyt = isFoodItemInCart.qyt
                const thisFoodItemPriceWithQyt = await (oneFoodPrice*foodItemQyt)
                totalPrice += thisFoodItemPriceWithQyt

                const jsonOfSummary = {
                    foodName: oneFood.name,
                    foodId: oneFood._id,
                    foodQyt: foodItemQyt,
                    eachFoodPrice: oneFoodPrice,
                    foodPriceWithQyt: thisFoodItemPriceWithQyt
                }

                itemSummary.push(jsonOfSummary)
            });

            // get the item details + users address
            const userAddress = userId.address
            const userPhone = userId.phone

            await new Order({
                orderId: userId,
                items: itemSummary,
                address: userAddress.toString(),
                phone: userPhone.toString(),
                totalAmount: totalPrice,
                orderDate: Date.now(),
                paidThrough: "card"
            }).save()

            return await res.status(200).json({
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
            orderId: userId
        })
        return res.status(200).json(allUserOrder)
    }
}

module.exports = order