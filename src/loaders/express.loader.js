const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const xss = require('xss-clean');

const env = require('../configs/env');
const { errorConverter, errorHandler } = require('../middlewares/error');
const routeConfig = require('../app/routes');

module.exports = () => {
    const app = express();

    // set log request
    app.use(morgan('dev'));

    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json());

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    // sanitize request data
    app.use(xss());
    app.use(mongoSanitize());

    // gzip compression
    app.use(compression());

    // set cors blocked resources
    app.use(cors());
    app.options('*', cors());

    // api routes
    app.use('/', routeConfig);

    // convert error to ApiError, if needed
    app.use(errorConverter);

    // handle error
    app.use(errorHandler);

    app.listen(env.app.port);

    return app;
};
