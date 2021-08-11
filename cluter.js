const cluter = require("cluster")
const os = require("os")
const cpuCount = os.cpus().length

if (cluter.isMaster) {
    for (let i = 0; i < cpuCount; i++) {
        cluter.fork()        
    }
    cluter.on('exit', function () {
        cluter.fork()
    })
} else {
    require("./app")
}