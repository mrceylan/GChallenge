const request = require('../../src/app/models/request');
var model = { startDate: "2020-01-25", endDate: "2020-01-26", minCount: 10, maxCount: 20 };

/**
 * checking validation for invalid dates
 */
describe("require Validate Dates", () => {
    it("should return error for invalid dates", () => {
        expect(request.validate(Object.assign({}, model).startDate = "nn").error).toBeDefined();
        expect(request.validate(Object.assign({}, model).endDate = "2020-13-13").error).toBeDefined();
    });
});

/**
 * checking validation for invalid counts
 */
describe("require Validate Counts", () => {
    it("should return error for invalid counts", () => {
        expect(request.validate(Object.assign({}, model).minCount = "a").error).toBeDefined();
        expect(request.validate(Object.assign({}, model).maxCount = "b").error).toBeDefined();
    });
});

/**
 * checking validation for required fields
 */
describe("require Validate Required Fields", () => {
    it("should return error for required fields", () => {
        for (const property in model) {
            var _model = Object.assign({}, model);
            delete _model[property];
            expect(request.validate(_model).error).toBeDefined();
        }
    });
});

/**
 * checking validation for min and max date comparisons
 */
describe("require Validate Date Comparisons", () => {
    it("should return error for endDate bigger than startDate", () => {
        expect(request.validate(Object.assign({}, model).endDate = "2020-01-24").error).toBeDefined();
    });
});

/**
 * checking validation for min and max count comparison
 */
describe("require Validate Count Comparisons", () => {
    it("should return error for maxCount bigger than minCount", () => {
        expect(request.validate(Object.assign({}, model).maxCount = 9).error).toBeDefined();
    });
});

/**
 * checking validation for successful model
 */
describe("validate Successful", () => {
    it("should return no error for validate", () => {
        expect(request.validate(model).error).toBeUndefined();
    });
});