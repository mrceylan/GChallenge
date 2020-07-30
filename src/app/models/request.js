const joi = require('joi');

/**
 * create new request model with validations
 */
var requestSchema = joi.object().keys({

  startDate: joi.date().required().error(errors => {
    errors.forEach(err => {
      switch (err.code) {
        case "any.required":
          err.message = "Start date is required";
          break;
        case "date.base":
          err.message = "Start date must be a valid date";
          break;
        default:
          break;
      }
    });
    return errors;
  }),

  endDate: joi.date().required().min(joi.ref("startDate")).error(errors => {
    errors.forEach(err => {
      switch (err.code) {
        case "date.min":
          err.message = "End date must be larger than or equal to start date";
          break;
        case "any.required":
          err.message = "End date is required";
          break;
        case "date.base":
          err.message = "End date must be a valid date";
          break;
        default:
          break;
      }
    });
    return errors;
  }),

  minCount: joi.number().integer().required().error(errors => {
    errors.forEach(err => {
      switch (err.code) {
        case "any.required":
          err.message = "Min count is required";
          break;
        case "number.base":
          err.message = "Min count must be a valid number";
          break;
        default:
          break;
      }
    });
    return errors;
  }),

  maxCount: joi.number().integer().required().min(joi.ref("minCount")).error(errors => {
    errors.forEach(err => {
      switch (err.code) {
        case "number.min":
          err.message = "Max count must be larger than or equal to min count";
          break;
        case "any.required":
          err.message = "Max count is required";
          break;
        case "number.base":
          err.message = "Max count must be a valid number";
          break;
        default:
          break;
      }
    });
    return errors;
  }),

});

module.exports = requestSchema;