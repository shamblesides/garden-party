const nconf = module.exports = require('nconf')
    .add('memory')
    .env()
    .defaults({
        "trustProxy": false,
        "logLevel": "info",

        "port": 8080,
    })
