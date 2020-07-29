var model;

/**
 * predefined response constants
 */
const RESPONSES = {
    SUCCESS: "Success",
    VALIDATION_ERROR: "Validation Error",
    SERVER_ERROR: "Server Error"
}

/**
 * generates new response model with specified response type
 * @param {*} response 
 * @param {*} msg 
 * @param {*} records 
 */
var generateResponse = function(response, msg, records){
    switch (response) {
        case RESPONSES.SUCCESS:
            model = {
                code: 0,
                msg: "Success",
                records: records
            };
            break;
        case RESPONSES.VALIDATION_ERROR:
            model = {
                code: 10,
                msg:  msg
            };
            break;
        case RESPONSES.SERVER_ERROR:
            model = {
                code: 90,
                msg: "Server Error " + msg
            };
        default:
            break;
    }
    return model;
};

module.exports.generateResponse = generateResponse;
module.exports.RESPONSES = RESPONSES;