const BaseException = require('./baseException');
class UnauthorizedException extends BaseException {

    constructor(message) {
        super(message, 401);
        this.name = this.constructor.name
    }
}
module.exports = UnauthorizedException