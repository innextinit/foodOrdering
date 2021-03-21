const Food = require("../models/food");
const ITEM_PER_PAGE = 50;


exports.getAvailableFoods = (req, res, next) => {
  const page = req.query.page || 1;
  let totalFoods;
  Food.find()
    .countDocuments()
    .then((numbersOfFoods) => {
      totalFoods = numbersOfFoods;
      return Food.find()
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE);
    })
    .then((foods) => {
      return res.status(200).json(foods);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};

exports.getFoodDetails = (req, res, next) => {
    const foodId = req.params.id;
    Food.findById(foodId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        err.statusCode = 503;
        next(err);
      });
  };