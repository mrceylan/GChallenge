# Getir Challenge Project

This project aims to create an API endpoint which filters mongodb data with request body filters. 

Project main entry point is `app.js` under `src/app` folder. It uses `express.js` to serve as http server. It starts to listen on port defined in **PORT** environment variable.

`Src` folder includes four folders for separate concerns. First folder db includes `dbContext.js` which is responsible for mongodb connection with `mongoose` lib. It uses connection string from **DB_CONNECTION** environment variable.

Second folder handler includes `filterEndpoint.js` which is responsible for handling incoming requests to filter endpoint. It firstly validates incoming request message, filters data with request variables and returns response model to client.

`Models` folder includes three files. First file `record.js` icnludes mongodb record model schema and filterData function which executes mongodb query for filtering data and returns predefined fields array. Second file `request.js` includes request model and validations with `joi` library. Third file `response.js` is responsible for creating response model to return to the client. It includes constant response types and generateResponse function for creating model. For success it returns `0` code, for validation errors it returns `10` code and for server errors it returns `90` code.

`Utils` folder includes `logger.js` which is responsible for centralizing log functions.

Request model has four validations.

* *startDate* field is required
* *endDate* field is required and cannot be smaller than *startDate*
* *minCount* field is required
* *maxCount* field is required and cannot be smaller than *minCount*

You can call the endpoint as follows;

```sh
curl --location --request POST 'https://getirchallenge28072020.herokuapp.com/filter' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 305,
    "maxCount": 600
}'
```

![Example Postman](https://user-images.githubusercontent.com/9802910/88854943-c841b500-d1fa-11ea-9775-87b5d046390c.jpg)

For testing it uses `Jest` library. It has two main tests, unit test and integration test.

In unit tests it checks for request model validations and response generate functionality.

In integration tests it firstly checks mongodb queries in `recordTest.js`, for this context it uses `mongodb-memory-server` library to create a in-memory version of mongo and seed example data to check queries are working right. These in-memory functions are implemented in `test/integration/helpers/db-handler.js`. 

Than it tests api endpoint in `endPoint.js` file, for this it uses `supertest` library.

For running application in local with `nodemon`, you can use the following command;
```sh
npm run start:dev
```

For running tests;
```sh
npm test
```