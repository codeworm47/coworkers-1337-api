const service = require('../service/coworker.service')
const BaseException = require('../exception/baseException')

const findById = (req, res) => {
    return service.findById(req.params.id)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

const find = (req, res) => {
    return service.find(req)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

const save = (req, res) => {
    return service.save(req)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

const handleError = (err, res) => {
    if (err instanceof BaseException){
        res.status(err.errorCode).send({'errorName': err.name, 'errorMessage': err.message, 'timestamp': new Date()});
    } else {
        res.status(500).send({'errorMessage': `an unknown error occurred ${err.message}`, 'timestamp': new Date()})
    }
}

module.exports = {findById, find, save}