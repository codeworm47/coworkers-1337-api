const Coworker = require('../model/coworker.model');
const logger = require('../../config/logger');
const BaseException = require('../exception/baseException');
const NotFoundException = require('../exception/notFoundException');
const InternalServerException = require('../exception/internalServerException');
const BadRequestException = require('../exception/badRequestException');
const _ = require('lodash');



const findById = (id) => {
    logger.debug("finding coworker : %s", id);
    return Coworker.findById(id)
        .then(coworker => {
            if (!coworker) {
               return Promise.reject(notFoundError(id));
            }
            return mapResponseObject(coworker);
        }).catch(err => throwError(err, 'find coworker by id', id))
}

const find = (req) => {
    const startParam = req.param('start');
    const endParam = req.param('end');
    const filterParam = req.param('filter')
    const start = startParam && !_.isNaN(startParam) ? parseInt(startParam) : 0;
    const end = endParam && !_.isNaN(endParam) ? parseInt(endParam) : undefined;
    const filterObject = filterParam ? {"name": {$regex: filterParam, $options: 'i'}} : null;
    const count = Coworker.count(filterObject);
    let find = Coworker.find(filterObject);

    if (start > 0) {
        find = find.skip(start)
    }
    if (end && end > 0) {
        find = find.limit(end - start)
    }
    return Promise.all([find, count])
        .then(result => {
            const coworker = result[0];
            const coworkerCount = result[1];
            return {'data': mapResponseList(coworker), 'totalLength': coworkerCount}
        })
        .catch(err => throwError(err, 'find coworkers'))
}

const save = (req) => {
    if (_.isNil(req.body) || _.isEmpty(req.body)) {
        return Promise.reject(new BadRequestException("body cannot be empty"));
    }
    const doc = extractCoworkerData(req.body);
    if (_.isEmpty(doc)) {
        return Promise.reject(new BadRequestException("invalid body"));
    }
    if (!_.isNil(doc.id)) {
        return update(doc.id, doc);
    } else {
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
        .catch(err => throwError(err, 'insert coworker'))
}

const update = (id, doc) => {
    logger.debug("updating coworker %s : %s", id, doc);

    return Coworker.findByIdAndUpdate(id, doc, {new: true})
        .then(coworker => {
            if (!coworker) {
                notFoundError(id);
            }
            logger.info("coworker updated successfully : %s", coworker);
            return mapResponseObject(coworker);
        }).catch(err => throwError(err, 'update coworker', id))
}

const notFoundError = (id) => {
    const msg = `coworker ${id} not found`;
    logger.error(msg);
    return new NotFoundException(msg, id);
}

const throwError = (err, operation, id = null) => {
    const msg = `an error occurred during ${operation} : ${err.message}`;
    logger.error(msg, err);
    if (err instanceof BaseException){
        throw err;
    }
    else if (id && err.kind === 'ObjectId') {
        throw notFoundError(id);
    } else {
        throw new InternalServerException(msg, err);
    }
}

const extractCoworkerData = (req) => validateAndSetFieldValues(req, 'id', 'name', 'country',
    'city', 'text', 'imagePortraitUrl', 'imageFullUrl')

const validateAndSetFieldValues = (req, ...fields) => {
    let doc = {}
    for (let field of fields) {
        if (!_.isNil(req[field])) {
            doc[field] = req[field]
        }
    }
    return doc;
}

//converting mongo response to json
const mapResponseObject = (res) => {
    res.id = res._id
    let response = extractCoworkerData(res);
    if (response.id && !_.isNaN(response.id)) {
        response.id = parseInt(response.id);
    }
    return response;
}

const mapResponseList = (res) => _.isEmpty(res) ? [] : res.map(i => mapResponseObject(i));

module.exports = {find, findById, save}