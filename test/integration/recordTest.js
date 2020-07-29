const mongoose = require('mongoose');
const recordModel = require('../../src/app/models/record');
const dbHandler = require('./helpers/db-handler');


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

beforeEach(async () => await dbHandler.seedData());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * query test suite.
 */
describe('query ', () => {

    /**
     * Tests that query return result
     */
    it('can return result', async () => {
        var result = await recordModel.filterData(new Date('2020-02-01'), new Date('2020-04-01'), 400, 700);
        console.log(result.length);
        expect(result.length).toBeGreaterThan(0);
    });

    /**
     * Tests that query return no result
     */
    it('can return no result', async () => {
        var result = await recordModel.filterData(new Date('2020-02-01'), new Date('2020-04-01'), 650, 700);
        console.log(result.length);
        expect(result.length).toBe(0);
    });
});

