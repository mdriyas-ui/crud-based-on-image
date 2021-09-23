const mongoose = require('mongoose');
//.env file config

require('dotenv').config();

const mongodb_url = process.env.MONGODB_URL_STRING;
const mongodb_atlas_url = process.env.MONGODB_ATLAS_URL_STRING;
const mongodb_url_production = process.env.MONGODB_URL_STRING_PRODUCTION;

// database connection 

mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});