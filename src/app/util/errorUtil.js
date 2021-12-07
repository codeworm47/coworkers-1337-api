const BaseException = require("../exception/baseException");
const getError = (err) => {
    let errResponse = {'errorName': err.name, 'errorMessage': err.message, 'timestamp': new Date()};
    if (err instanceof BaseException) {
        return {'statusCode': err.errorCode, 'responseBody': errResponse}
    } else {
        errResponse.errorName = `errorMessage': \`an unknown error occurred ${err.message}`;
        return {'statusCode': 500, 'responseBody': errResponse}
    }
}

module.exports = {getError}