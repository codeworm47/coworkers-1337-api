const errorUtil = require("../util/errorUtil");

function middlewareWrapper() {
    return handleError;
}
const handleError = (err, req, res, next) => {
    const errorResult = errorUtil.getError(err);
    res.status(errorResult.statusCode).send(errorResult.responseBody);
}
module.exports = middlewareWrapper