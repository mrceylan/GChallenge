const joi = require('joi');

/**
 * create new request model with validations
 */
var requestSchema = joi.object().keys({
    startDate: joi.date().required(),
    endDate: joi.date().required().min(joi.ref("startDate")),
    minCount: joi.number().integer().required(),
    maxCount: joi.number().integer().required().min(joi.ref("minCount"))
  });

module.exports = requestSchema;