const env = require("dotenv")
env.config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const auth = require("express-openid-connect")
const config = require("./middleware/auth0")
const { PORT } = process.env
const fileUpload = require("express-fileupload")

app.use( auth( config ) )
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/", require("./routes/index"))

app.listen(PORT, async () => {
    await require("./config/mongodbconfig")()
    console.log(`Process PID [${process.pid}] ::> Server listening on port ${ PORT } @ http://localhost:${ PORT }`)
})

module.exports = app
require("./createNewData")