const service = require('../service/coworker.service');
const errorUtil = require('../util/errorUtil');

const findById = (req, res, next) => {
    return service.findById(req.params.id)
        .then(data => res.send(data))
        .catch(err => next(err));
}

const find = (req, res, next) => {
    return service.find(req)
        .then(data => res.send(data))
        .catch(err => next(err));
}

const save = (req, res, next) => {
    return service.save(req)
        .then(data => res.send(data))
        .catch(err => next(err));

}

module.exports = {findById, find, save}