const dbConfig = require('./config');
const logger = require('./logger')
const mongoose = require('mongoose');

const init = () => {
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose.connect(dbConfig.db.uri, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database");
    }).catch(err => {
        logger.info('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

module.exports = {init}
