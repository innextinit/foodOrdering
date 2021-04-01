const Food = require("../models/food")

class foodController{
  static async allFood(req, res, next) {
    try {
      const allFoods = await Food.find()
      return res.status(200).json(allFoods)
    } catch (error) {
      next(error)
    }
  }

  static async aFoodDetails(req, res, next) {
    try {
      const foodId = req.params.id;
      const foodDetails = await Food.findById(foodId)
      return res.status(200).json(foodDetails)
    } catch(error) {
        next(error)
    }
  }
}

module.exports = foodController