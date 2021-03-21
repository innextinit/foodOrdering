const mongoose = require('mongoose');
const env = require("dotenv")
env.config()

const { MONGODB_URI } = process.env

const options = {
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
     useFindAndModify: false
};

module.exports = async () => {
     try {
          await mongoose.connect(MONGODB_URI, options)
          console.log(`:::> Connected to MongoDB database ${ MONGODB_URI }`)
     } catch (error) {
          console.log("<::: Couldn't connect to database ", error)
     }
};