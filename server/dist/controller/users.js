"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNewPasswordFromUser = exports.displayNewPasswordForm = exports.resetPasswordLink = exports.getEmailFromUser = exports.changePassword = exports.createUsers = exports.updateUser = exports.confirmUsers = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var joi_1 = __importDefault(require("joi"));
var joi_2 = require("../middleware/joi");
var signupModel_1 = __importDefault(require("../model/signupModel"));
var nodemailer_1 = __importDefault(require("../nodemailer"));
var EmailValidator = require('email-deep-validator');
var emailValidator = new EmailValidator();
var secret = process.env.ACCESS_TOKEN_SECRET;
var cloudinary = require('cloudinary').v2;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, _a, oldPassword, newPassword, confirmPassword, user, validPassword, newPasswords, updatedPassword, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user_id = req.user;
                    console.log(user_id, "chabgeP");
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword, confirmPassword = _a.confirmPassword;
                    if (newPassword !== confirmPassword) {
                        res
                            .status(400)
                            .json({
                            status: 'Client error',
                            message: 'Password does not match'
                        });
                    }
                    return [4 /*yield*/, signupModel_1.default.findById(user_id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ message: 'User doesnt exist' })];
                    }
                    validPassword = bcryptjs_1.default.compareSync(oldPassword, user.password);
                    return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 10)];
                case 2:
                    newPasswords = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 6, , 7]);
                    if (!validPassword) return [3 /*break*/, 5];
                    return [4 /*yield*/, signupModel_1.default.findByIdAndUpdate(user._id, { password: newPasswords }, { new: true })];
                case 4:
                    updatedPassword = _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            status: 'Ok',
                            message: "Password change successful"
                        })];
                case 5:
                    res.status(404).json({
                        status: 'Not found',
                        message: 'Not a valid password',
                    });
                    res.status(404).json({
                        status: 'Not found',
                        message: 'Not a valid password',
                    });
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    console.log('changePassword =>', err_1);
                    res.status(500).send({
                        status: 'Not found',
                        message: 'Unable to process request',
                    });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.changePassword = changePassword;
function getEmailFromUser(req, res) {
    return res.render('getEmail');
}
exports.getEmailFromUser = getEmailFromUser;
//Function to send a reset password link to the user's email address
function resetPasswordLink(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, user, validatorSchema, validator, token, Email, subject, link, body, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    return [4 /*yield*/, signupModel_1.default.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    validatorSchema = joi_1.default.object({
                        email: joi_1.default.string().required().min(6).max(50).email(),
                    });
                    validator = validatorSchema.validate(req.body);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    if (validator.error) {
                        return [2 /*return*/, res.status(404).json({
                                status: 'Not found',
                                message: validator.error.details[0].message,
                            })];
                    }
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({
                                status: 'Not found',
                                message: 'User not found',
                            })];
                    }
                    token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                    Email = email;
                    subject = 'Reset Password';
                    link = req.protocol + "://localhost:3000/password/" + token;
                    body = "\n    <h2>Please click on the given <a href=" + link + ">link</a>  to reset your password</h2>\n    ";
                    if (!(process.env.CONDITION !== "test")) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, nodemailer_1.default)(subject, Email, body)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, res.status(200).render('fakeEmailView', { link: link })];
                case 5:
                    err_2 = _a.sent();
                    res.status(500).json({
                        status: 'Server Error',
                        message: 'Unable to process request',
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.resetPasswordLink = resetPasswordLink;
//Function to get get new password from the user
function displayNewPasswordForm(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, verified;
        return __generator(this, function (_a) {
            token = req.params.token;
            if (!token) {
                res.status(401).json({
                    status: '401 Unauthorized',
                    message: 'Token not found',
                });
            }
            try {
                verified = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
                res.render('resetPassword', { token: token });
            }
            catch (err) {
                console.log('displayNewPasswordForm => ', err);
                res.status(401).json({
                    status: '401 Unauthorized',
                    message: 'Invalid token',
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.displayNewPasswordForm = displayNewPasswordForm;
//Function to process the new password from the user
function processNewPasswordFromUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var ValidateSchema, validator, _a, password, confirmPassword, token, check, hashedPassword, updatedUser, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ValidateSchema = joi_1.default.object({
                        token: joi_1.default.string().required(),
                        password: joi_1.default.string().required().min(6).max(20),
                        confirmPassword: joi_1.default.string().required().min(6).max(20),
                    });
                    validator = ValidateSchema.validate(req.body);
                    if (validator.error) {
                        return [2 /*return*/, res.status(400).json({
                                message: validator.error.details[0].message,
                            })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword, token = _a.token;
                    if (password !== confirmPassword) {
                        res.status(400).json({
                            status: 'Client error',
                            message: 'Password does not match',
                        });
                    }
                    check = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
                    hashedPassword = bcryptjs_1.default.hashSync(password, 12);
                    return [4 /*yield*/, signupModel_1.default.findByIdAndUpdate(check.userId, { password: hashedPassword }, { new: true })];
                case 2:
                    updatedUser = _b.sent();
                    // const { id, name, email } = updatedUser;
                    // return res.redirect('/');
                    return [2 /*return*/, res.status(200).json({
                            status: 'Successful',
                            message: 'Password reset successful',
                        })];
                case 3:
                    err_3 = _b.sent();
                    console.log('forgotPassword =>', err_3);
                    res.status(500).json({
                        status: 'Service Error',
                        message: 'Unable to process request',
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.processNewPasswordFromUser = processNewPasswordFromUser;
function createUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, email, password, confirm_password, finder, validDomain, newUsers, token, subject, Email, body, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, confirm_password = _a.confirm_password;
                    if (password !== confirm_password) {
                        res.status(404).send({ msg: 'Password do not match' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, signupModel_1.default.findOne({ email: email })];
                case 1:
                    finder = _b.sent();
                    if (finder) {
                        res.status(404).send({ msg: 'Email already exists' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, emailValidator.verify(email)];
                case 2:
                    validDomain = (_b.sent()).validDomain;
                    if (!validDomain) {
                        res.status(404).send({ msg: 'Please provide a valid email address' });
                        return [2 /*return*/];
                    }
                    newUsers = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                    };
                    return [4 /*yield*/, (0, joi_2.signToken)(newUsers)];
                case 3:
                    token = _b.sent();
                    subject = 'Please Verify Your Account';
                    Email = email;
                    body = "\n    <h2>Please click on the given <a href=\"http://localhost:3000/redirect/" + token + "\">link</a> to activate your acount.</h2></br>\n    <h3>This link expires in 15mins</h3>\n    ";
                    if (!(process.env.CONDITION !== "test")) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, nodemailer_1.default)(subject, Email, body)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    res
                        .status(201)
                        .send({ msg: 'A mail has been sent to you for verification!!!' });
                    return [3 /*break*/, 7];
                case 6:
                    err_4 = _b.sent();
                    // console.log(err)
                    res.status(404).send({ msg: 'Error!!!' });
                    return [2 /*return*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.createUsers = createUsers;
function confirmUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var decoded, args, user, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    decoded = jsonwebtoken_1.default.verify(req.params.token, secret);
                    args = decoded.args;
                    if (!args) {
                        throw new Error('Thrown here');
                    }
                    return [4 /*yield*/, signupModel_1.default.create(args)];
                case 1:
                    user = _a.sent();
                    res.status(201).send({ msg: 'Created Successful!!!' });
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    res.status(404).send({ msg: 'Invalid Token!!!' });
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.confirmUsers = confirmUsers;
function updateUser(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, img_Url, user, url, fname, lname, emil, gend, newDetails;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.user._id;
                    return [4 /*yield*/, signupModel_1.default.findById(id)];
                case 1:
                    user = (_b.sent());
                    img_Url = user.avatar;
                    if (!req.file) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)];
                case 2:
                    url = (_b.sent()).url;
                    img_Url = url;
                    _b.label = 3;
                case 3:
                    fname = req.body.firstName || " ";
                    lname = req.body.lastName || " ";
                    emil = req.body.email || " ";
                    gend = req.body.gender || " ";
                    newDetails = {
                        firstName: fname.trim() || user.firstName,
                        lastName: lname.trim() || user.lastName,
                        email: emil.trim() || user.email,
                        gender: gend.trim() || user.gender,
                        role: req.body.role,
                        about: req.body.about,
                        location: req.body.location,
                        avatar: img_Url,
                    };
                    signupModel_1.default.findByIdAndUpdate(id, newDetails, function (err) {
                        if (err) {
                            return res.status(404).json({
                                message: err.message,
                                type: 'fail',
                            });
                        }
                        res.status(201).json({
                            message: 'Profile updated successfully!',
                            data: newDetails
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
