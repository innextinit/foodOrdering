const User = require("../models/user-model")
const Food = require("../models/food-model")
const auth = require("../middleware/auth-middleware")
const passAuth = require("../middleware/passwordHash-middleware")
const Token = require("../models/token-model")
const crypto = require("crypto")
const { url, APP_NAME } = require("../config/index")

class controller {
    static async allFoods(req, res, next) {
        try {
          const allFoods = await Food.find({available: true})
          return res.status(200).json({
             message: `Welcome to this foodOrdering site. <br> Check out https://github.com/innext/foodOrdering.git for the readme.md to know how to acess the endpoints`,
             allFoodsAvailable:  allFoods
            })
        } catch (error) {
          next(error)
        }
      }

    static async newUser(req, res, next) {
        let { name, password, email } = req.body

        try {
            if (!name || !email || !password) {
              const err = new Error()
              err.name = "Bad Request"
              err.status = 400
              err.message = "Please fill all details"
              throw err
            }
    
            const foundUser = await User.findOne({"email": email})
    
            if (foundUser) {
                const err = new Error()
                err.name = "Not Acceptable"
                err.status = 406
                err.message = "This user already exit"
                throw err
            }
            
            password = passAuth.hashPassword( password )

            const user = new User({
                name,
                password,
                email
            })
            await user.save()
    
            const userJson = auth.authJSON(user)
            return await res.status(201).json({
                success: true,
                status: 201,
                message: "User created successfully",
                user: userJson
            })
    
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
  
        try {
          if (!email || !password) {
            const err = new Error()
            err.name = "Bad Request"
            err.status = 400
            err.message = "Please input all details"
            throw err
          }
    
          const user = await User.findOne({"email": email})
          
          if (!user) {
            const err = new Error()
            err.name = "Authentication Error"
            err.status = 401
            err.message = "This user doesn't exists"
            throw err
          }
          
          const userPW = user.password
          const isMatch = passAuth.compareHash(password, userPW)
          
          if (!isMatch) {
            const err = new Error()
            err.name = "Authentication Error"
            err.status = 401
            err.message = "Passowrd Incorrect"
            throw err
          }
          
          const userJson = auth.authJSON(user)
          return await res.json({
            success: true,
            user: userJson
          })
        } catch (error) {
          next(error);
        }
    }

    static async userUpdate(req, res, next) {
        const user = req.user
        try {
            let { name, address, phone } = req.body
            const update = await User.updateOne(
                { _id: user._id},
                { $set: { name: name, address: address, phone, phone } },
                { new: true }
            )
            return await res.json(update)
        } catch (error) {
            next(error)
        }
    }

    static async userProfile(req, res, next) {
        const user = req.user
        res.json(user)
    }

    static async updatePassword(req, res, next) {
        const user = req.user
        try {
            let password = req.body.password
            let newPassword = req.body.newPassword
            const isCorrect = passAuth.compareHash(password, user.password)

            if (!isCorrect) {
                const err = new Error()
                err.name = "Authentication Error"
                err.status = 401
                err.message = "Passowrd Incorrect"
                throw err
            }

            const hash = passAuth.hashPassword( newPassword )

            await User.updateOne(
                { _id: user._id},
                { $set: { password: hash } },
                { new: true }
            )

            return res.json({
                message: "password reset successful",
                status: 201
            })
        } catch (error) {
            next(error)
        }
    }

    static async requestPasswordReset(req, res, next) {
        try {
            let email = req.body.email
            const user = await User.findOne({email: email})

            if (!user) {
                const err = new Error()
                err.name = "Authentication Error"
                err.status = 401
                err.message = "This user doesn't exists"
                throw err
            }

            let token = await Token.findOne({ userId: user._id })
            if (token) await token.deleteOne()

            let resetToken = crypto.randomBytes(32).toString("hex")
            const hash = passAuth.hashPassword( resetToken )
            
            await new Token({
                userId: user._id,
                token: hash,
                createdAt: Date.now()
            }).save()

            const link = `http://${url.CLIENT_URL}/resetpassword?userId=${user._id}&resetToken=${resetToken}`

            return res.json(link)
        } catch (error) {
            next(error)
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const { userId, resetToken } = req.query
            const { password } = req.body

            let user = await Token.findOne({ userId: userId })

            if (!user) {
                const err = new Error()
                err.name = "Authentication Error"
                err.status = 401
                err.message = "Invalid or expired password reset token"
                throw err
            }

            const isValid = passAuth.compareHash(resetToken, user.token)

            if (!isValid) {
                const err = new Error()
                err.name = "Authentication Error"
                err.status = 401
                err.message = "Invalid or expired password reset token"
                throw err
            }

            const hash = passAuth.hashPassword( password )

            await User.updateOne(
                {_id: userId},
                { $set: { password: hash } },
                { new: true }
            )

            await user.deleteOne()

            return await res.json({
                message: "password reset successful",
                status: 201
            })
        } catch (error) {
            next(error)
        }
    }

    static async delUser(req, res, next) {
        const user = req.user
        try {
            if (!user) {
                const err = new Error()
                err.name = "Not Acceptable"
                err.status = 406
                err.message = "Could not find the User"
                throw err
            }
    
            const del = await user.deleteOne()
            return await res.json(del)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = controller