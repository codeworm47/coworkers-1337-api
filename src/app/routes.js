const coworkerController = require("./controller/coworker.controller");
const authController = require("./controller/auth.controller");
module.exports = (app) => {
    const ROUTE = "/api"
    const controller = require('./controller/coworker.controller');

    // Retrieve a single Coworker by id
    app.get(`${ROUTE}/coworker/:id`, coworkerController.findById);

    // Retrieve all the Coworkers
    app.get(`${ROUTE}/coworkers`, coworkerController.find);

    // Saving a single Coworker
    app.post(`${ROUTE}/coworker/`, coworkerController.save);

    // Get Token by user name
    app.post(`${ROUTE}/login`, authController.getToken);

}