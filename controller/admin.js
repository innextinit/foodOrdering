const mongodb = require("mongodb")
const binary = mongodb.Binary
const Food = require("../models/food-model")
const User = require("../models/user-model")

class controller {
  static async newFood(req, res, next) {
      let { name, description, price, category } = req.body
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

          const food = new Food({
              name,
              description,
              price,
              category,
              images: binary(req.files.image.data)

          })
          await food.save()
  
          return await res.status(201).json({
              success: true,
              message: `${food.name} of price ${price} was added successfully`
          })
  
      } catch (error) {
          next(error)
      }
  }

  static async allFoods(req, res, next) {
      try {
        let foods = await Food.find()
       return  await res.json(foods)
      } catch (error) {
        next(error)
     }
  }

  static async deleteFood(req, res, next) {
    try {
      let foodId = req.params.id
      let foundFood = await Food.findOne({_id: foodId})
      if (!foundFood) {
        const err = new Error()
        err.name = "Not Found"
        err.status = 404
        err.message = "The food you looking for wasnt found sir"
        throw err
      }
      
      const del = await foundFood.deleteOne()
      res.json({"message": `${del.name} was delete successfully`})
    } catch (error) {
      next(error)
    }
  }

  static async makeAdmin(req, res, next) {
    try {
      if(req.user.role === "admin") {
        const toBeAdmin = req.body.userToBeAdmin
        const findUser = await User.findOne({email: toBeAdmin})
        if (!findUser) {
          return res.status(404).json("User Not Found, make sure the user is registered")
        }
        if (findUser.role === "admin") {
          return res.status(406).json("Not Acceptable, this user is already an admin")
        }
        await User.findOneAndUpdate(
          {
            email: toBeAdmin
          },
          {
            role: "admin"
          },
          {
            upsert: true
          }
        )
        res.status(201).json(`${toBeAdmin} is now an admin by ${req.user.name}`)
      } else {
        if(req.user.role !== "admin") {
          throw new Error("sorry, you cant access this function")
        }
      }
    } catch(error) {
      next(error)
    }
  }

  static async makeFoodAvailable(req, res, next) {
    try {
      const foodToMakeAvaiableOrNot = req.body.foodName.toString()
      const findFood = await Food.findOne({name: foodToMakeAvaiableOrNot})

      if (!findFood) {
        return res.status(404).json(`The food with the name ${foodToMakeAvaiableOrNot} is not a food here yet, do well to add the food first`)
      }
      
      if (findFood.available) {
        await findFood.updateOne(
          {
            available: false
          },
          {
            upsert: true
          }
        )
        return res.status(201).json(`${findFood.name} is no more available for order`)
      }

      if (!findFood.available) {
        await findFood.updateOne(
          {
            available: true
          },
          {
            upsert: true
          }
        )
        return res.status(201).json(`${findFood.name} is now available for ordering`)
      }
    } catch (error) {
      next(error)
    }
  }
}


module.exports = controller