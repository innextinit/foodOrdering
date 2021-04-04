const Cart = require("../models/cart-model")
const Food = require("../models/food-model")

class CartClass {
  static async addToCart(req, res, next) {
    try {
      const userId = req.user
      const foodToAddToCart = req.params.id.toString()
      let qty = req.params.qty

      const foundFood = await Food.findById(foodToAddToCart)
      
      const findUsersCart = await Cart.find({userId: userId._id})
      
      const checkCart = findUsersCart.filter((eachItemInUserCart) => {
        return eachItemInUserCart.foodId.toString() === foundFood._id.toString()
      })

      if (checkCart == 0) {
        if ( foundFood._id.toString() === foodToAddToCart && qty <= 0 || null || undefined ) {
          qty = 1
        }
        if ( foundFood._id.toString() === foodToAddToCart && qty >= 1) {
          await new Cart({
            userId: userId._id,
            foodId: foundFood,
            qty: qty
          }).save()
          return res.status(201).json(`${foundFood.name} was added successfully`) 
        }
      }

      return res.status(501).json(`this isnt implemented as you have ${foundFood.name} in your cart before`)
    
    } catch (error) {
      next(error)
    }
  }

  static async allCartItem(req, res, next) {
    try {
      const userId = req.user
      const findUsersCart = await Cart.find({userId: userId._id})
      return res.status(200).json(findUsersCart)
    } catch (error) {
      next(error)
    }
  }

  static async editCart(req, res, next) {
    try {
      const userId = req.user
      const foodItemToUpdate = req.params.id
      let newQty = req.params.qty

      const findCart = await Cart.findById(foodItemToUpdate)

      if (findCart.userId.toString() == userId._id.toString() && findCart.qty.toString() !== newQty.toString()) {
        if ( newQty <= 0 || null || undefined ) {
          return res.status(501).json("Item can not be less then ONE, so not implemented")
        }
        if (newQty >= 1) {
          await findCart.updateOne({
            qty: newQty
          })
         return res.status(201).json(`${findCart.foodId} qty was updated to ${newQty}`)
        }
      }
      return res.status(200).json("in it really state nothing happened")
    } catch (error) {
      next(error)
    }
  }

  static async removeFromCart(req, res, next) {
    try {
      const userId = req.user
      const foodItemToRemove = req.params.id     
      const findUsersCart = await Cart.find({userId: userId._id})
     
      const checkCart = findUsersCart.filter((eachItemInUserCart) => {
        return eachItemInUserCart._id.toString() === foodItemToRemove.toString()
      })

      if (checkCart.length !== 0 && checkCart !== undefined && checkCart !== null) {
        await Cart.deleteOne({_id : checkCart[0]._id.toString()})
        return res.status(201).json(`${checkCart[0].foodId} was removed from cart`)
      }
     
      return res.status(200).json("looks like the item was not found")
    } catch (error) {
      next(error)
    }
  } 
}

module.exports = CartClass