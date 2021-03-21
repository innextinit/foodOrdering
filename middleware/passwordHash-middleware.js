const bcrypt = require("bcrypt")
const { BCRYPT_SALT } = require("../config/index")

class passwordMiddleware {
    static hashPassword( password ) {
        return bcrypt.hashSync( password, BCRYPT_SALT )
    }

    static compareHash( password, userPW ) {
        return bcrypt.compareSync( password, userPW )
    }
}

module.exports = passwordMiddleware