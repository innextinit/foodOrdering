This is a food ordering service.



This are the things that would be done at the end of this project.

    controller = "../controller/index"
    auth = "../middleware/auth-middleware"

get anyOne get all food - controller - allFoods

post user signup - controller - newUser
post user login - controller - login
post user edit users profile - controller - userUpdate - auth - decodeToken
get user get user profile - controller - userProfile - auth - decodeToken
post user update users password - controller - updatePassword - auth - decodeToken
get user request password reset - controller - requestPasswordReset - auth - decodeToken
post user reset password - controller - resetPassword - auth - decodeToken
delete user delete user - controller - delUser - auth - decodeToken

post user add to cart
get user get all cart item
put user edit cart
post user remove from cart

get user get cart item to checkout
get user get all order histroy

    controller = "../controller/food"
get food get all foods - controller - allFoods - auth - decodeToken
get food get details by id - controller -aFoodDetails - auth - decodeToken

    controller = "../controller/admin"
post admin new food - controller - newFood - auth - decodeToken - isAdmin
get admin all foods - controller - allFoods - auth - decodeToken - isAdmin
delete admin delete food by id - controller - deleteFood - auth - decodeToken - isAdmin
post admin make user admin - controller -makeAdmin - auth - decodeToken - isAdmin
post admin make food available -controller - makeFoodAvailable - auth - decodeToken - isAdmin


This project is having the postman collection. I would at the end of this project add the things needed to run this project on your end like MongoDB database connection, etc.