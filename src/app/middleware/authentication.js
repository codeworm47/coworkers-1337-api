const config = require("./../../config/config");
const jwtUtil = require('../util/jwtUtil');
const UnauthorizedException = require('../exception/unauthorizedException');

function middlewareWrapper() {
    return authentication;
}
const authentication = (req, res, next) => {
    if (!JSON.parse(config.auth.enabled) || req.originalUrl === '/api/login'){
        next();
    } else{
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader){
            throw new UnauthorizedException("Authorization header is missing in the request headers");
        } else{
            const decodedToken = jwtUtil.decode(authorizationHeader, config.auth.jwtSecret);
            //just checking user name exists in the claims cause we put user name when generating token.
            if (decodedToken && decodedToken['username']){
                next();
            } else{
                //invalid token
                throw new UnauthorizedException(`Invalid token : ${authorizationHeader}`);
            }

        }
    }
}
module.exports = middlewareWrapper