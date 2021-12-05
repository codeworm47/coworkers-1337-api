const service = require('../service/coworker.service')
const findById = (req, res) =>{
    return service.findById(req.params.id)
        .then(data=> res.send(data))
}

const find = (req, res) =>{
    return service.find(req)
        .then(data=> res.send(data))
}

const save = (req, res) =>{
    return service.save(req)
        .then(data=> res.send(data))
}
module.exports = {findById, find, save}