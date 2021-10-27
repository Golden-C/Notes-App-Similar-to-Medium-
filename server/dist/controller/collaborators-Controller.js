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
exports.getNotification = exports.uploadFile = exports.adminRemoveCollaborator = exports.removeCollaborator = exports.confirmCollaborator = exports.inviteCollborator = void 0;
var noteModel_1 = __importDefault(require("../model/noteModel"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var signupModel_1 = __importDefault(require("../model/signupModel"));
var notificationModel_1 = __importDefault(require("../model/notificationModel"));
var nodemailer_1 = __importDefault(require("../nodemailer"));
var send_notification_1 = require("../middleware/send-notification");
var joi_1 = require("../middleware/joi");
var EmailValidator = require('email-deep-validator');
var emailValidator = new EmailValidator();
var cloudinary = require('cloudinary').v2;
var secret = process.env.ACCESS_TOKEN_SECRET;
function inviteCollborator(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, id, finder, noteFinder, content, validDomain, user, token, subject, body, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    email = req.body.email;
                    id = req.params.noteId;
                    return [4 /*yield*/, signupModel_1.default.findOne({ email: email })];
                case 1:
                    finder = _a.sent();
                    if (req.user.email === email)
                        return [2 /*return*/, res.status(404).send({ msg: "Note owner cannot be a Collaborator" })];
                    if (!finder) return [3 /*break*/, 3];
                    return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(id, { "$addToSet": { collaboratorId: finder._id } }, { new: false })];
                case 2:
                    noteFinder = _a.sent();
                    if (noteFinder.collaboratorId.includes(finder._id))
                        return [2 /*return*/, res.status(404).send({ msg: "Already a Collaborator" })];
                    content = "You have been added as a contributor to  " + noteFinder.title + " note";
                    (0, send_notification_1.sendNotification)(email, content, noteFinder._id);
                    res.status(201).send({ msg: 'Notification Sent' });
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, emailValidator.verify(email)];
                case 4:
                    validDomain = (_a.sent()).validDomain;
                    if (!validDomain) {
                        res.status(404).send({ msg: 'Please provide a valid email address' });
                        return [2 /*return*/];
                    }
                    user = {
                        email: email,
                        id: id
                    };
                    return [4 /*yield*/, (0, joi_1.collabToken)(user)];
                case 5:
                    token = _a.sent();
                    subject = 'Invitation to Collaborate on  Note';
                    body = "\n    <h2>Please click on the given <a href=\"http://localhost:3000/collaboratorsignup/" + token + "\">link</a> to register your acount.</h2>\n    ";
                    if (!(process.env.CONDITION !== 'test')) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, nodemailer_1.default)(subject, email, body)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    res.status(201).json({ msg: 'A mail has been sent to you to register!!!', token: token });
                    return [2 /*return*/];
                case 8:
                    err_1 = _a.sent();
                    res.status(404).send({ error: err_1.message });
                    return [2 /*return*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.inviteCollborator = inviteCollborator;
function confirmCollaborator(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, password, confirm_password, decoded, _b, email, id, newUser, noteFinder, err_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, confirm_password = _a.confirm_password;
                    if (password !== confirm_password) {
                        res.status(404).send({ msg: "Password do not match" });
                        return [2 /*return*/];
                    }
                    decoded = jsonwebtoken_1.default.verify(req.params.token, secret);
                    _b = decoded.args, email = _b.email, id = _b.id;
                    if (!decoded.args) {
                        throw new Error("Thrown here");
                    }
                    return [4 /*yield*/, signupModel_1.default.create({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password
                        })];
                case 1:
                    newUser = _c.sent();
                    return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(id, { "$addToSet": { collaboratorId: newUser._id } }, { new: true })];
                case 2:
                    noteFinder = _c.sent();
                    res.status(201).send({ msg: 'Created Successful!!!' });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _c.sent();
                    res.status(404).send({ error: err_2.message });
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.confirmCollaborator = confirmCollaborator;
function removeCollaborator(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var finder, content, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(req.params.id, { "$pull": { collaboratorId: req.user._id } }, { new: true })];
                case 1:
                    finder = _a.sent();
                    content = "You have Successfully been removed from " + finder.title + " note";
                    return [4 /*yield*/, (0, send_notification_1.sendNotification)(req.user.email, content, finder._id)];
                case 2:
                    _a.sent();
                    res.status(201).send({ msg: 'Removed Successful!!!' });
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    res.status(404).send({ error: err_3.message });
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeCollaborator = removeCollaborator;
function adminRemoveCollaborator(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, id, finder, result, content, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    email = req.body.email;
                    id = req.params.id;
                    return [4 /*yield*/, noteModel_1.default.findOne({ email: email })];
                case 1:
                    finder = _a.sent();
                    if (!finder)
                        return [2 /*return*/, res.status(404).send({ error: "Not a user" })];
                    if (email === req.user.email)
                        return [2 /*return*/, res.status(404).send({ msg: "Note Owner cannot be remove" })];
                    return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(id, { "$pull": { collaboratorId: finder._id } }, { new: true })];
                case 2:
                    result = _a.sent();
                    content = "Collaborator has been Successfully removed from " + finder.title + " note";
                    return [4 /*yield*/, (0, send_notification_1.sendNotification)(email, content, finder._id)];
                case 3:
                    _a.sent();
                    res.status(201).send({ msg: 'Removed Successful!!!' });
                    return [3 /*break*/, 5];
                case 4:
                    err_4 = _a.sent();
                    res.status(404).send({ error: err_4.message });
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.adminRemoveCollaborator = adminRemoveCollaborator;
function uploadFile(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, result, user, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    id = req.params.upId;
                    if (!req.file) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)];
                case 1:
                    result = _b.sent();
                    return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(id, { "$addToSet": { fileUpload: result.url } }, { new: true })];
                case 2:
                    user = _b.sent();
                    res.status(200).send(user);
                    return [2 /*return*/];
                case 3: return [2 /*return*/, res.status(404).send({ error: "Please input a file" })];
                case 4:
                    err_5 = _b.sent();
                    res.status(404).send({ error: err_5.message });
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.uploadFile = uploadFile;
function getNotification(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, notifications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.user.id;
                    return [4 /*yield*/, notificationModel_1.default.find({ userId: userId })];
                case 1:
                    notifications = _a.sent();
                    console.log(notifications);
                    if (notifications.length === 0) {
                        res.status(200).send('You dont have any notifications at the moment');
                        return [2 /*return*/];
                    }
                    res.status(200).json(notifications);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getNotification = getNotification;
