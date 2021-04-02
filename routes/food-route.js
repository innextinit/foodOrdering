const express = require("express")
const router = express.Router()
const controller = require("../controller/food")
const auth = require("../middleware/auth-middleware")

router.get(
    "/all",
    auth.decodeToken,
    controller.allFoods
)

router.get(
    "/:id",
    auth.decodeToken,
    controller.aFoodDetails
)

module.exports = router