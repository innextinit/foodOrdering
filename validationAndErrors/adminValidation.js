const Joi = require("@hapi/joi")
const Schema = require("./validationSchema")
const validator = require("./validator")

export default class incomingInputValidation {
    static async validateNewFoodInput(req, res, next) {
        const schema = Joi.object().keys({
            name: Schema.name,
            description: Schema.description,
            price: Schema.price,
            category: Schema.category
        })
        validator(schema, req.body, res, next)
    }

    static async validateUserToMakeAdmin(req, res, next) {
        const schema = Joi.object().keys({
            email: Schema.email
        })
        validator(schema, req.body, res, next)
    }
}