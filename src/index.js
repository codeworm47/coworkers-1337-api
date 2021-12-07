const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const config = require('./config/config');
const mongoose = require('./config/mongoose');
const cors = require('cors');
const globalErrorHandler = require("./app/middleware/globalErrorHandler")
const authentication = require("./app/middleware/authentication");

// create an express app
const app = express();

//initializing mongoose and connecting it to MongoDB
mongoose.init()

//registering json parser middleware for parsing application/json
app.use(bodyParser.json())
//registering cors middleware to allow the apis be called from other origins.
app.use(cors());
//registering Bearer token (JWT token) authentication middleware.
app.use(authentication());
//registering api routes
require('./app/routes')(app);
//registering global error handler middleware to capture and handle all the errors throughout the app.
app.use(globalErrorHandler());

// starting the server and listening for requests
const port = config.server.port;
app.listen(port, () => {
    logger.info(`Server is listening on port ${port}`);
    require('./dataInitializer').init()
});