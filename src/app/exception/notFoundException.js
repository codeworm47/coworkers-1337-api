const BaseException = require('./baseException')
class NotFoundException extends BaseException {

    constructor(message, id) {
        super(message, 404);
        this.name = this.constructor.name
        this.id = id
    }
}
module.exports = NotFoundException