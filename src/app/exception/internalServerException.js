const BaseException = require('./baseException')
class InternalServerException extends BaseException {

    constructor(message, err = null) {
        super(message, 500);
        this.name = this.constructor.name
    }
}
module.exports = InternalServerException