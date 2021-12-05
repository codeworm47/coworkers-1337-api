const BaseException = require("./baseException")
class BadRequestException extends BaseException{
    constructor(message, verb) {
        super(message);
        this.name = this.constructor.name
        this.verb = verb;
    }
}