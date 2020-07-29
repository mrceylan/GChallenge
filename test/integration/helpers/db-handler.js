const mongoose = require('mongoose');
const recordModel = require('../../../src/app/models/record');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { response } = require('express');
const { date } = require('joi');

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: 1
    };

    await mongoose.connect(uri, mongooseOpts);
}

/**
 * seed example data to memory database.
 */
module.exports.seedData = async() => {
    var _entity = new recordModel({ key: "key", createdAt: Date.parse("2020-03-01"), value: "Getir Task", counts: [100, 200, 300] });
    await _entity.save();
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}