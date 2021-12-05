const Coworker = require('../model/coworker.model');
const logger = require('../../config/logger')
const NotFoundException = require('../exception/notFoundException')
const InternalServerException = require('../exception/internalServerException')
const BadRequestException = require('../exception/badRequestException')
const _ = require('lodash')


const findById = (id) => {
    logger.debug("finding coworker : %s", id);
    return Coworker.findById(id)
        .then(coworker => {
            if (!coworker) {
                notFound(id);
            }
            return mapResponseObject(coworker);
        }).catch(err => handleError(err, id))
}

const find = (req) => {
    const startParam = req.param('start');
    const endParam = req.param('end');
    const start = startParam && !_.isNaN(startParam) ? parseInt(startParam) : 0;
    const end = endParam && !_.isNaN(endParam) ? parseInt(endParam) : undefined;
    let find = Coworker.find().skip(start)
    if (end && end > 0) {
        find = find.limit(end-start)
    }
    return find
        .then(coworker => mapResponseList(coworker))
        .catch(err => handleError(err))
}

const save = (req) => {
    if (!req.body){
        throw new BadRequestException("body cannot be empty", "POST");
    }
    const doc = extractCoworkerData(req.body);
    if (_.isEmpty(doc)){
        throw new BadRequestException("invalid body", "POST");
    }
    if (doc.id){
        return update(doc.id, doc);
    } else{
        return insert(doc);
    }
}

const insert = (doc) => {
    logger.debug("saving coworker : %s", doc);

    return Coworker.create(doc)
        .then(coworker => {
            logger.info("coworker inserted successfully : %s", coworker);
            return mapResponseObject(coworker);
        })
        .catch(err => handleError(err))
}

const update = (id, doc) => {
    logger.debug("updating coworker %s : %s", id, doc);

    return Coworker.findByIdAndUpdate(id, doc, {new: true})
        .then(coworker => {
            if (!coworker) {
                notFound(id);
            }
            logger.info("coworker updated successfully : %s", coworker);
            return mapResponseObject(coworker);
        }).catch(err => handleError(id, err))
}

const notFound = (id) => {
    const msg = `coworker ${id} not found`;
    logger.error(msg);
    throw new NotFoundException(`coworker ${id} not found`, id);
}

const handleError = (err, id = null) => {
    if (id && err.kind === 'ObjectId') {
        notFound(id);
    }
    const msg = `an error occurred during save coworker ${err}`;
    logger.error(msg);
    throw new InternalServerException(msg, err);
}

const extractCoworkerData = (req) => validateAndSetFieldValues(req, 'id', 'name', 'country',
    'city', 'text', 'imagePortraitUrl', 'imageFullUrl')

const validateAndSetFieldValues = (req, ...fields) => {
    let doc = {}
    for (let field of fields) {
        if (req[field]) {
            doc[field] = req[field]
        }
    }
    return doc;
}

const mapResponseObject = (res) => {
    res.id = res._id
    let response = extractCoworkerData(res);
    if (response.id && !_.isNaN(response.id)){
        response.id = parseInt(response.id);
    }
    return response;
}

const mapResponseList = (res) => _.isEmpty(res) ? [] : res.map(i => mapResponseObject(i));

module.exports = {find, findById, save}