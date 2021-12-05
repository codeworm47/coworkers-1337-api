const BaseException = require('./baseException')
class InternalServerException extends BaseException {

    constructor(message, err = null) {
        super(message);
        this.name = this.constructor.name
        if (err){
            this.err = err;
        }
    }
}
module.exports = InternalServerException