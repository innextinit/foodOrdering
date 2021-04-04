const express = require("express")
const router = express.Router()
const controller = require("../controller/cart")
const auth = require("../middleware/auth-middleware")

router.post(
    "/:id/:qty",
    auth.decodeToken,
    controller.addToCart
)

router.get(
    "/",
    auth.decodeToken,
    controller.allCartItem
)

router.put(
    "/:id/:qty",
    auth.decodeToken,
    controller.editCart
)

router.delete(
    "/:id",
    auth.decodeToken,
    controller.removeFromCart
)

module.exports = router