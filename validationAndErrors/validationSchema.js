const Joi = require("@hapi/joi")

export default {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: true }
      })
      .trim()
      .required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    array: Joi.array().required(),
    boolean: Joi.boolean().required(),
    json: Joi.object().required(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>"\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/
      )
      .trim()
      .required()
      .min(1)
      .error(
        new Error(
          "Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)"
        )
      ),
    date: Joi.date().required(),
    token: Joi.string()
      .required()
      .error(new Error("token is required and must be a string")),
    role: Joi.string()
      .valid("user", "admin")
      .required(),
    gender: Joi.string().valid("MALE", "FEMALE", "OTHER"),
    phone: Joi.string()
      .regex(/^[0-9]{10}/)
      .optional()
      .error(
        new Error(
          "phoneNumber field needs to have a 10 chars and they must all be numbers"
        )
      ),
    birthDate: Joi.date()
      .optional()
      .max("01-01-2002")
      .error(
        new Error(
          "Format of birth date needs to be  dd-mm-yyyy and Needs to be before 01-01-2002"
        )
      ),
    string: Joi.string().trim().min(1).required(),
    stringOptional: Joi.string().trim().min(1).optional(),
    stringLong: Joi.string().trim().required().min(30),
    stringLongOptional: Joi.string().trim().optional().min(30),
    id: Joi.hex().required()
   }