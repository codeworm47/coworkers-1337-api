const authService = require("../service/auth.service");

const getToken = (req, res) => {
    const token = authService.getToken(req);
    res.set('content-type', 'text/plain');
    res.send(token);
}

module.exports = {getToken}