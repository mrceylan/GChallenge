const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./app/utils/logger');
const mongoose = require('./app/db/dbContext');
const filterEndpointHandler = require('./app/handler/filterEndpoint');

/**
 * create express app
 */
const app = express();

/** 
 * use json parse middleware
 */
app.use(express.json());

app.post('/filter', filterEndpointHandler);

/**
 * app starts listen on port
 */
app.listen(process.env.LISTEN_PORT, ()=>{
    logger.info('Server started on port ' + process.env.LISTEN_PORT);
});

module.exports = app;