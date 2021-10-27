"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validateRequest = function (req, res, next) {
    var result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        var errors = result.errors;
        var message = errors[errors.length - 1].msg;
        return res.status(400).json({ message: message, errors: errors });
    }
    next();
};
exports.default = validateRequest;
