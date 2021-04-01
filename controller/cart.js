const User = require("../models/user-model")
const Food = require("../models/food-model")

class Cart {
  static async addToCart(req, res, next) {
    try {
      const userId = req.user
      const { foodToAddToCart } = req.params.toString()
      let { qty } = req.params

      const foundFood = await Food.findById(foodToAddToCart)

      if ( qty <= 0 || null || undefined ) {
        qty = 1
      }
      if (qty >= 1) {
        await userId.updateOne(cart.push({food: foundFood._id.toString(), qty: qty }))
        return res.status(201).json(`${foundFood.name} was added successfully`) 
      }
    } catch (error) {
      next(error)
    }
  }

  static async editCart(req, res, next) {
    try {
      const userId = req.user
      const {foodItemToUpdate} = req.params.toString()
      let {newQty} = req.params
       if ( newQty <= 1 || null || undefined ) {
         newQty = 1
         return res.status(200).json("Cart Updated, On lie liieee")
       }
       if (newQty >= 1) {
        const itemToUpdate = await userId.cart.filter((cartItems) => {
          return cartItems.food !== foodItemToUpdate
        })
        await userId.updateOne(cart = itemToUpdate)
        await userId.updateOne(cart.push({food: foodItemToUpdate, qty: newQty}))
        return res.status(201).json("Cart Updated")
       }
    } catch (error) {
      next(error)
    }
  }

  static async removeFromCart(req, res, next) {
    try {
      const userId = req.user
      const {foodItemToRemove} = req.params.toString()
      const newCartItem = await User.cart.filter((cartItems) => {
        return cartItems.food !== foodItemToRemove
      })
      await userId.updateOne(cart = newCartItem)
      return res.status(201).json("Item Removed From Cart")
    } catch (error) {
      next(error)
    }
  }

  static async allCartItem(req, res, next) {
    try {
      const userId = req.user
      const cartItem = userId.cart.filter((cartItems) => {
        return cartItems
      })
      return res.status(200).json(cartItem)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Cart