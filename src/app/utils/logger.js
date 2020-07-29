var Logger = function () { };

/**
 * create new info log
 * @param {*} log 
 */
Logger.prototype.info = function (log) {
    console.log(new Date()+'info:::::'+log);
};

/**
 * create new debug log
 * @param {*} log 
 */
Logger.prototype.debug = function (log) {
    console.log(new Date()+'debug:::::'+log);
};

/**
 * create new error log
 * @param {*} log 
 */
Logger.prototype.error = function (log) {
    console.log(new Date()+'error:::::'+log);
};

module.exports = new Logger();