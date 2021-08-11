class Response {
  static customResponse(res, status, message = null, data = null) {
    return res.status(status).json({
      status,
      message,
      data
    })
  }

  static notAcceptableError(res, message) {
    return res.status(406).json({
      status: 406,
      message,
      error: "Not Acceptable"
    })
  }

  static validationError(res, message) {
    return res.status(422).json({
      status: 422,
      message,
      error: "Validation Error"
    })
  }

  static authenticationError(res, message) {
    return res.status(401).json({
      status: 401,
      message,
      error: "Authentication Error"
    })
  }

  static authorizationError(res, message) {
    return res.status(403).json({
      status: 403,
      message,
      error: "Authorization Error"
    })
  }

  static notFoundError(res, message) {
    return res.status(404).json({
      status: 404,
      message,
      error: "Not Found"
    })
  }

  static conflictError(res, message) {
    return res.status(409).json({
      status: 409,
      message,
      error: "Conflict Error"
    })
  }

  static badRequestError(res, message) {
    return res.status(400).json({
      status: 400,
      message,
      error: "Bad Request"
    })
  }
}

export default Response
