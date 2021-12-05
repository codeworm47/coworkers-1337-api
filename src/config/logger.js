const config = require('./config')
const winston = require('winston');


module.exports = winston.createLogger({
    level: config.logging.level,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    //defaultMeta: {service: 'root'},
    transports: [new winston.transports.Console()],
});