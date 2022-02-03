const User = require("./models/user-model")
const passAuth = require("./middleware/passwordHash-middleware")
const Food = require("./models/food-model")

let adminName = "admin",
    userName = "user",
    password = "Password&123",
    email = "admin@testmail.com",
    userEmail = "user@testmail.com"
    role = "admin"
    food = ["rice", "rice and beans", "beans with dodo", "yam", "yam with egg", "rice with dodo"]
    price = [10, 15, 25, 20, 20, 15]

async function adminUser( name, password, email, role ) {
    const checkUser = await User.findOne({email: email})
    if (checkUser) {
        console.log(`User dey before`)
        console.log(`Here is the login details for user, email: ${email}, password: ${password}`)
        return
    }
    try {
        let unhashPassword = password
        password = passAuth.hashPassword(password)
        await new User({
            name,
            password,
            email,
            role
        }).save()
        console.log(`Here is the login details for ${role}, email: ${email}, password: ${unhashPassword}`)
    }  catch (error) {
        throw error
    }
}

async function normalUser( name, password, email ) {
    try {
        let unhashPassword = password
        password = passAuth.hashPassword(password)
        await new User({
            name,
            password,
            email
        }).save()
         console.log(`Here is the login details for user, email: ${email}, password: ${unhashPassword}`)
    } catch (error) {
      throw error  
    }
}

async function foodAdding( name, description, price, category, available ) {
    try {
        const checkFood = await Food.findOne({name: name})
        if (checkFood) {
            console.log(`Food dey before`)
            return
        }
        await new Food({
            name,
            description,
            price,
            category,
            available
        }).save()
        console.log(`${name} was added with the ${price} to the category ${category}`)
    } catch (error) {
        throw error
    }
}

for (let i = 0; i < food.length; i++) {
    let newFood = food[i];
    let newPrice = 0
    for (let x = 0; x < price.length; x++) {
        newPrice = price[x];
        foodAdding(newFood, newFood, newPrice, "African", true)
    }
}

adminUser(adminName, password, email, role)
normalUser(userName, password, userEmail)