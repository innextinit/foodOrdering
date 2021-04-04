const express = require("express")
const router = express.Router()
const controller = require("../controller/order")
const auth = require("../middleware/auth-middleware")

router.post(
    "/",
    auth.decodeToken,
    controller.checkout
)

router.get(
    "/",
    auth.decodeToken,
    controller.orderHistroy
)

module.exports = router