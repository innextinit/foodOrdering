const env = require("dotenv")
env.config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const { PORT } = process.env

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(fileUpload())

app.use("/", require("./routes/index"))

app.listen(PORT, async () => {
    await require("./config/mongodbconfig")()
    console.log(`::> Server listening on port ${ PORT } @ http://localhost:${ PORT }`)
})

module.exports = app
// require("./createNewData")