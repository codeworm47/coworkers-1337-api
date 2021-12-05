const Coworker = require('./app/model/coworker.model');
const _ = require('lodash')
const logger = require('./config/logger')

//Reading coworker data from sampleData.json and storing them into Mongo collection
const init  = () => {
    let coworkerData = require('./sampleData.json')
    if (coworkerData){
        logger.info("starting data initialization");
        Coworker.find().select("_id")
            .then(existingIds => {
                let data;
                existingIds = existingIds.map(x=>x._id)
                if (!_.isEmpty(existingIds)){
                    //excluding existing data (since they're already inserted in db)
                    data = coworkerData.data.filter(p=> !existingIds.includes(p.id));
                } else{
                    data = coworkerData.data;
                }
                data = data.map(x=>{
                    return {_id:x.id, ...x}
                });
                if (!_.isEmpty(data)){
                    Coworker.insertMany(data).then()
                } else{
                    logger.info("all the data already imported");
                }
                logger.info("data initialization finished");
            });

    }
}

module.exports = {init}