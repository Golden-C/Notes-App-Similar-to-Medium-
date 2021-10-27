"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidator = exports.forgotPasswordValidator = exports.resetPasswordValidator = exports.registerValidator = exports.profileValidator = exports.signInValidator = void 0;
var express_validator_1 = require("express-validator");
var signInValidator = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .isString()
        .isLength({ min: 7 })
        .withMessage("Password is required"),
];
exports.signInValidator = signInValidator;
var registerValidator = [
    (0, express_validator_1.body)("fullName")
        .notEmpty()
        .isString()
        .withMessage("Full name is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .isString()
        .isLength({ min: 7 })
        .withMessage("Password is required"),
];
exports.registerValidator = registerValidator;
var resetPasswordValidator = [
    (0, express_validator_1.body)("token")
        .notEmpty()
        .isString()
        .withMessage("Token Required"),
    (0, express_validator_1.body)("newPassword")
        .notEmpty()
        .isString()
        .isLength({ min: 7 })
        .withMessage("Your new Password should be at least 7 characters"),
    (0, express_validator_1.body)("confirmPassword")
        .notEmpty()
        .isString()
        .isLength({ min: 7 })
        .withMessage("Your confirmed Password should be at least 7 characters"),
];
exports.resetPasswordValidator = resetPasswordValidator;
var forgotPasswordValidator = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email is required")
];
exports.forgotPasswordValidator = forgotPasswordValidator;
var profileValidator = [
    (0, express_validator_1.body)("fullName")
        .notEmpty()
        .isString()
        .withMessage("Full name is required"),
];
exports.profileValidator = profileValidator;
var changePasswordValidator = [
    (0, express_validator_1.body)("password")
        .notEmpty()
        .isString()
        .isLength({ min: 7 })
        .withMessage("Old Password is required"),
    (0, express_validator_1.body)("newPassword")
        .notEmpty()
        .isString()
        .isLength({ min: 7 })
        .withMessage("Your new Password should be at least 7 characters"),
    (0, express_validator_1.body)("confirmPassword")
        .notEmpty()
        .isString()
        .isLength({ min: 7 })
        .withMessage("Your confirmed Password should be at least 7 characters"),
];
exports.changePasswordValidator = changePasswordValidator;
