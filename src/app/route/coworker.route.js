const controller = require("../controller/coworker.controller");
module.exports = (app) => {
    const ROUTE = "/api/coworkers"
    const controller = require('../controller/coworker.controller');

    // Retrieve a single Coworker by id
    app.get(`${ROUTE}/:id`, controller.findById);

    // Retrieve all Coworkers
    app.get(ROUTE, controller.find);

    //Saving a single Coworker
    app.post(`${ROUTE}/`, controller.save);

}