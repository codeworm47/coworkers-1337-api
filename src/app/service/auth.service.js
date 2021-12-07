const jwtUtil = require('../util/jwtUtil');
const _ = require('lodash');
const BadRequestException = require("../exception/badRequestException");

const getToken = (req) =>{
    if (_.isNil(req.body) || _.isEmpty(req.body)) {
        throw new BadRequestException("body cannot be empty");
    }
    const username = req.body.username;
    if (!username){
        throw new BadRequestException("username is missing in the body");
    }
    return  jwtUtil.generate(username);
}

module.exports = {getToken}