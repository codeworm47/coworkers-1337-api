const EntityException = require('./entityException')
class InternalServerException extends EntityException {

    constructor(message, err = null) {
        super(message);
        this.name = this.constructor.name
        if (err){
            this.args = err;
        }
    }
}
module.exports = InternalServerException