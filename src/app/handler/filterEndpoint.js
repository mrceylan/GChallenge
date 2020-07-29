const record = require('../models/record');
const logger = require('../utils/logger');
const request = require('../models/request');
const response = require('../models/response');

/**
 * filter endpoint handler, validates model and returns query result
 * @param {*} req 
 * @param {*} res 
 */
var endPointHandler = async function(req, res){
    try {

        const { error, value } = request.validate(req.body);

        if(error){
            return res.status(400).json(response.generateResponse(response.RESPONSES.VALIDATION_ERROR, error.details[0].message));
        }

        const list = await record.filterData(value.startDate, value.endDate, value.minCount, value.maxCount);
        res.json(response.generateResponse(response.RESPONSES.SUCCESS, null, list));

    } catch (err) {
        logger.error(err);
        res.status(500).send(response.generateResponse(response.RESPONSES.SERVER_ERROR));
    }
};

module.exports = endPointHandler;