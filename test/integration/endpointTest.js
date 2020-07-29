const supertest = require("supertest");
const app = require("../../src/app");

const apiServer = supertest(app);

/**
 * checking api endpoint validation works
 */
describe("Filter Endpoint Validations", () => {
    /**
     * checking validation returns no error for valid data
     */
    it("should return 200", async () => {
        const { body } = await apiServer
            .post('/filter')
            .send({
                startDate: "2016-01-26",
                endDate: "2018-02-02",
                minCount: 2950,
                maxCount: 3000
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(res.body.code).toBe(0);
                expect(res.body.msg).toBe("Success");
            });
    });

    /**
     * checking endpoint returns value
     */
    it("should return value", async () => {
        const { body } = await apiServer
            .post('/filter')
            .send({
                startDate: "2016-01-26",
                endDate: "2018-02-02",
                minCount: 2950,
                maxCount: 3000
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(res.body.records.length).toBeGreaterThan(0);
            });
    });

    /**
     * checking endpoint returns error for invalid date
     */
    it("should return 400 for date validation error", async () => {
        const { body } = await apiServer
            .post('/filter')
            .send({
                startDate: "2016-01-26",
                endDate: "2015-02-02",
                minCount: 2950,
                maxCount: 3000
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400)
            .expect((res) => {
                expect(res.body.code).toBe(10);
            });
    });

    /**
     * checking endpoint returns error for invalid count
     */
    it("should return 400 for count validation error", async () => {
        const { body } = await apiServer
            .post('/filter')
            .send({
                startDate: "2016-01-26",
                endDate: "2016-02-02",
                minCount: 2950,
                maxCount: "nn"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400)
            .expect((res) => {
                expect(res.body.code).toBe(10);
            });
    });

    /**
     * checking endpoint returns error for wrong count data
     */
    it("should return 400 for count validation error", async () => {
        const { body } = await apiServer
            .post('/filter')
            .send({
                startDate: "2016-01-26",
                endDate: "2016-02-02",
                minCount: 2950,
                maxCount: 2800
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400)
            .expect((res) => {
                expect(res.body.code).toBe(10);
            });
    });
});
