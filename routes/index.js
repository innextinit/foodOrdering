const express = require('express')
const router = express.Router()
const controller = require("../controller/index")
const  auth = require("../middleware/auth-middleware")
    
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
    
router.post(
    "/edit",
    auth.decodeToken,
    controller.userUpdate
)
    
router.get(
    "/:id",
    auth.decodeToken,
    controller.userProfile
)
    
router.post(
    "/updatepassword",
    auth.decodeToken,
    controller.updatePassword
)
    
router.post(
    "/requestpasswordreset",
    auth.decodeToken,
    controller.requestPasswordReset
)
    
router.post(
    "/resetpassword",
    auth.decodeToken,
    controller.resetPassword
)
    
router.delete(
    "/:id",
    auth.decodeToken,
    controller.delUser
)
module.exports = router