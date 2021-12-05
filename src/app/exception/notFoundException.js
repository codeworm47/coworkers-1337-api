const BaseException = require('./baseException')
class NotFoundException extends BaseException {

    constructor(message, id) {
        super(message);
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
        this.id = id
    }
}
module.exports = NotFoundException