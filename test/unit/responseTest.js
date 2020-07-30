const response = require('../../src/app/models/response');

/**
 * checking create response function returns right code
 */
describe("response Return Codes", () => {
    it("should match return codes", () => {
        expect(response.generateResponse(response.RESPONSES.SUCCESS).code).toEqual(0);
        expect(response.generateResponse(response.RESPONSES.VALIDATION_ERROR).code).toEqual(10);
        expect(response.generateResponse(response.RESPONSES.SERVER_ERROR).code).toEqual(90);
    });
});

/**
 * checking create response model returns right message
 */
describe("response Msg Results", () => {
    it("should match msg result", () => {
        const _msg = "message";
        expect(response.generateResponse(response.RESPONSES.VALIDATION_ERROR, _msg).msg).toEqual(_msg);
    });
});

/**
 * checking create response model returns right records
 */
describe("response Record Results", () => {
    it("should match record result", () => {
        const records = ["a", "b", "c"];
        expect(response.generateResponse(response.RESPONSES.SUCCESS, null, records).records).toEqual(records);
    });
});