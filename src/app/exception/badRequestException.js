const BaseException = require("./baseException")
class BadRequestException extends BaseException{
    constructor(message) {
        super(message, 400);
        this.name = this.constructor.name
    }
}

module.exports = BadRequestException