const Food = require("../models/food-model")

class controller {
  static async newFood(req, res, next) {
      let { name, description, price, category, images } = req.body

      try {
          if (!name || !price || !description) {
            const err = new Error()
            err.name = "Bad Request"
            err.status = 400
            err.message = "Please fill all required details"
            throw err
          }
  
          const foundName = await Food.findOne({"name": name})
  
          if (foundName) {
              const err = new Error()
              err.name = "Not Acceptable"
              err.status = 406
              err.message = "This food name dey meun before sir/ma"
              throw err
          }

          const Food = new Food({
              name,
              description,
              price,
              category,
              images
          })
          await Food.save()
  
          return await res.status(201).json({
              success: true,
              message: `${Food.name} of price ${price} was added successfully`
          })
  
      } catch (error) {
          next(error)
      }
  }

  static async allFood(req, res, next) {
    try {
      let Foods = await Food.find()
      res.json(Foods)
    } catch (error) {
      next(error)
    }
  }

  static async deleteFood(req, res, next) {
    try {
      let {foodId} = req.params
      let foundFood = await Food.findById(food)
      if (!foundFood) {
        const err = new Error()
        err.name = "Not Found"
        err.status = 404
        err.message = "The food you looking for isnt in the requested sir"
        throw err
      }
      
      const del = await Food.deleteOne()
      res.json({"message": `${del.name} was delete succedd`})
    } catch (error) {
      next(error)
    }
  }
}