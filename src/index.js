const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/logger')
const config = require('./config/config')
const mongoose = require('./config/mongoose')

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//initializing mongoose and connecting it to MongoDB
mongoose.init()

//registering api routes
require('./app/route/coworker.route')(app);

// listen for requests
app.listen(3001, () => {
    logger.info(`Server is listening on port ${config.server.port}`);
    require('./dataInitializer').init()
});