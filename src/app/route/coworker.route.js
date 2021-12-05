const controller = require("../controller/coworker.controller");
module.exports = (app) => {
    const ROUTE = "/api"
    const controller = require('../controller/coworker.controller');

    // Retrieve a single Coworker by id
    app.get(`${ROUTE}/coworker/:id`, controller.findById);

    // Retrieve all Coworkers
    app.get(`${ROUTE}/coworkers`, controller.find);

    //Saving a single Coworker
    app.post(`${ROUTE}/coworker/`, controller.save);

}