const express = require("express")
const router = express.Router()
const controller = require("../controller/admin")
const auth = require("../middleware/auth-middleware")

router.get(
    "/allfoods",
    auth.decodeToken,
    auth.isAdmin,
    controller.allFoods
)

router.post(
    "/",
    auth.decodeToken,
    auth.isAdmin,
    controller.newFood
)

router.post(
    "/makeadmin",
    auth.decodeToken,
    auth.isAdmin,
    controller.makeAdmin
)

router.post(
    "/makeavailable",
    auth.decodeToken,
    auth.isAdmin,
    controller.makeFoodAvailable
)

router.delete(
    "/:id",
    auth.decodeToken,
    auth.isAdmin,
    controller.deleteFood
)
 
module.exports = router