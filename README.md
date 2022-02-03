## About this work
This the backend project for a food ordering platform without the implementation of the payment system. This a [NodeJS]() project built with this helping hands [ExpressJS](), [Mongoose](), [Bcrypt](), [JSONwebtoken](), [Dotenv](), [Body-Parser](), and [Nodemon]() for development.

## Installation
Use [`npm install` comman]() to install the dependencies.
```
$ npm install
```

## Start-Up
Rename the [`.dev-env` file](`https://github.com/innext/foodOrdering#.dev-env`) to .env
```
$ mv .dev-env .env
```
Now, open the file to include the port the server would listen on and the mongodb url for database.

State-Up the server by running
```
$ node app.js
// or nodemon if installed too
$ nodemon app.js
```

## Usage
Below are the methods, route, the user, and reference to the controller and auth function that performs every action.

Method | Route | Controller | Auth
-----------|-----------|-----------|-----------
get | / | allFoods | -
post | /signup | newUser | -
post | /login | login | -
put | /updatepassword | updatePassword | decodeToken
post | /requestpasswordreset | requestPasswordReset | -
post | /resetpassword | resetPassword | -
get | /:id | userProfile | decodetoken
put | /edit | userUpdate | decodeToken
delete | /:id | delUser | decodeToken
get | /food/all | allFoods | decodeToken
get | /food/:id | aFoodDetails | decodeToken
get | /user/cart/ | allCartItem | decodeToken
post | /user/cart/:id/:qty | addTocart | deodeToken
put | /user/cart/:id/:qty | editCart | decodeToken
delete | /user/cart/:id | removeFromCart | decodeToken
post | /user/ordering/ | checkout | decodeToken
get | /user/ordering/ | orderHistroy | decodeToken
post | /admin/ | newFood | decodeToken, isAdmin
get | /admin/allfoods | allFoods | decodeToken, isAdmin
post | /admin/makeavailable | makeFoodAvailable | decodeToken, isAdmin
post | /admin/makeadmin | makeAdmin | decodetoken, isAdmin
delete | /admin/:id | deleteFood | decodetoken, isAdmin

### Order Information
There is postman file with this project [foodOrdering.postman_collection.json]() that would help during testing. Also, you can quickly create test users with the [createUser.js]() file by **uncommenting** the last line in app.js file to have `require("./createUser")`

```
...
...
...
app.listen(PORT, async () => {
    await require("./config/mongodbconfig")()
    console.log(`::> Server listening on port ${ PORT } @ http://localhost:${ PORT }`)
})

module.exports = app
//  require("./createUser")             <<<<--------
```
In the console you would get this same message
```
Here is the login details for admin, email: admin@testmail.com, password: Password&123
Here is the login details for user, email: user@testmail.com, password: Password&123
```
You can use those details to start, do not for to comment that line back when the users are created. **Enjoy**

### Issues
Any issue? please create the issue with full details of the issue, would get to it.