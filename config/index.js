const env = process.env.NODE_ENV

const environments = {
     dev: require("./env/dev.json"),
     prod: require("./env/prod.json")
}


module.exports = environments[env] || environments["dev"]