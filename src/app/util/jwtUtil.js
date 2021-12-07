const jwt = require('jsonwebtoken');
const config = require('../../config/config')
const logger = require('../../config/logger')
const secret = config.auth.jwtSecret;

const generate = (username) => {
    return jwt.sign({username: username}, secret,
        {issuer: 'coworkers-1337-api', subject: 'User'});
}

const decode = (token) => {
    try{
        return jwt.verify(token, secret);
    } catch (err){
        logger.error("an error occurred during JWT token verification : %s", err.message);
        return null;
    }
}

module.exports = {generate, decode}