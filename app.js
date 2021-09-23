const express = require('express');

//logger for debugging purpose
const log4js=require('log4js');
const serverLogger = log4js.getLogger('server')
serverLogger.level = 'all'

//create a express application
const app = express();

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

//configure database
require('./config/database_config');

//load the necessary models in server file
require('./models/employee');
require('./models/image_url');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//load necessary routes
app.use(require('./api-routes/employee.routes'))

// port listen
app.listen(process.env.PORT, () => {
    serverLogger.info(`Listening on ${process.env.BASE_URL}`)

 });


