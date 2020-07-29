const mongoose = require('mongoose');

const _model = 'Record';

const recordSchema = new mongoose.Schema({
    key: {
        type: String
    },
    createdAt: {
        type: Date,
    },
    value: {
        type: String
    },
    counts: {
        type: Array
    },
});

/**
 * filter mongoose data and returns model
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} minCount 
 * @param {*} maxCount 
 */
recordSchema.statics.filterData = async function(startDate, endDate, minCount, maxCount) {
    var _recordModel = this.model(_model);
    return new Promise(function(resolve, reject) {
        _recordModel.aggregate([
            {
                "$addFields": {
                    "totalCount": {
                        "$reduce": {
                            "input": "$counts",
                            "initialValue": 0,
                            "in": { "$sum" : ["$$value", "$$this"] }
                        }
                    }
                }
            }
            ,
            { "$project" : { "key" : 1 , "createdAt" : 1, "totalCount": 1, "_id":0 } },
            {
                "$match": {
                    "createdAt": {
                        "$gt": startDate,
                        "$lt": endDate
                    },
                    "totalCount": {
                        "$gt": minCount,
                        "$lt": maxCount
                    }
                },
            }
        ]).exec((err, data) => {  
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
    
};

module.exports = mongoose.model(_model, recordSchema);