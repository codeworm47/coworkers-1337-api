const EntityException = require('./entityException')
class NotFoundException extends EntityException {

    constructor(message, id) {
        super(message);
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
        this.id = id
    }
}
module.exports = NotFoundException