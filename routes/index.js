const express = require('express')
const router = express.Router()
const controller = require("../controller/index")


// router.use("/admin", require("./admin-route"))
// router.use("/food", require("./food-route"))
// router.use("/user/cart", require("./cart-route"))
// router.use("/user/ordering", require("./ordering-route"))

router.post(
    "/signup"
)

router.post(
    "/login"
)

router.post(
    "/edit"
)

router.get(
    "/:id"
)

router.delete(
    "/:id"
)

module.exports = router