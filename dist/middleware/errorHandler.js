"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function globalErrorHandler(err, req, res, next) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        error: message,
    });
}
exports.default = globalErrorHandler;
