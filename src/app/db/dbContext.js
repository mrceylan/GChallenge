const mongoose = require('mongoose')
const logger = require('../utils/logger');

/**
 * mongoose connect to db defined in environment connection string
 */
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true}
    , () => {
        logger.info('Connected to MongoDb..');
    }).catch(err=>{
        logger.error(err);
    });


module.exports.mongoose = mongoose;