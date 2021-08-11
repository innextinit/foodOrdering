const errorResponse = require("./errorResponse")
require("@hapi/joi")

export default async (schema, dataFromReq, res, next) => {
  try {
    await schema.validateAsync(dataFromReq)
    next()
  } catch (error) {
    return errorResponse.validationError(res, error.message)
  }
}
