const express = require('express')
const router = express.Router()
const controller = require("../controller/index")
const  auth = require("../middleware/auth-middleware")

router.use(
    "/docs",
    require("./doc")
)

router.use(
    "/admin",
    require("./admin-route")
)

router.use(
    "/food",
    require("./food-route")
)

router.use(
    "/user/cart",
    require("./cart-route")
)

router.use(
    "/user/ordering",
    require("./ordering-route")
)

router.get(
    "/",
    controller.allFoods
)

router.post(
    "/signup",
    controller.newUser
)
    
router.post(
    "/login",
    controller.login
)
    
router.put(
    "/edit",
    auth.decodeToken,
    controller.userUpdate
)
    
router.put(
    "/updatepassword",
    auth.decodeToken,
    controller.updatePassword
)
    
router.post(
    "/requestpasswordreset",
    controller.requestPasswordReset
)
    
router.post(
    "/resetpassword",
    controller.resetPassword
)
router.get(
    "/:id",
    auth.decodeToken,
    controller.userProfile
)

router.delete(
    "/:id",
    auth.decodeToken,
    controller.delUser
)
module.exports = router