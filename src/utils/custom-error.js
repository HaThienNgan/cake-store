const env = require('../configs/env');

class CustomError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    get HttpStatusCode() {
        return this.statusCode;
    }

    get JSON() {
        return {
            errorType: this.errorType,
            errorMessage: this.message,
            ...(env.isDevelopment && { stack: this.stack }),
        };
    }
}

module.exports = CustomError;