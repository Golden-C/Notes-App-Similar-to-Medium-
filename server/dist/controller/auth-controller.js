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
exports.signOut = exports.signIn = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var signupModel_1 = __importDefault(require("../model/signupModel"));
// import { sendMail } from "../services/email-service";
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userEmail, password, user, secret, token, _b, _id, _c, firstName, _d, lastName, _e, email, _f, about, _g, location_1, _h, gender, _j, avatar, err_1;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = req.body, userEmail = _a.email, password = _a.password;
                _k.label = 1;
            case 1:
                _k.trys.push([1, 3, , 4]);
                return [4 /*yield*/, signupModel_1.default.validateCredentials(userEmail, password)];
            case 2:
                user = _k.sent();
                secret = process.env.ACCESS_TOKEN_SECRET;
                token = jsonwebtoken_1.default.sign({ _id: user._id }, secret);
                res.cookie("tko", token, {
                    maxAge: 1000 * 60 * 60,
                    httpOnly: false,
                });
                _b = user._id, _id = _b === void 0 ? "" : _b, _c = user.firstName, firstName = _c === void 0 ? "" : _c, _d = user.lastName, lastName = _d === void 0 ? "" : _d, _e = user.email, email = _e === void 0 ? "" : _e, _f = user.about, about = _f === void 0 ? "" : _f, _g = user.location, location_1 = _g === void 0 ? "" : _g, _h = user.gender, gender = _h === void 0 ? "" : _h, _j = user.avatar, avatar = _j === void 0 ? "" : _j;
                res.status(200).json({
                    user: { _id: _id, firstName: firstName, lastName: lastName, email: email, about: about, location: location_1, gender: gender, avatar: avatar },
                    token: token
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _k.sent();
                console.log(err_1.message);
                res.status(400).json({
                    error: err_1.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
var signOut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.clearCookie("tko");
        return [2 /*return*/, res.status(200).json({
                message: "signed out successfully",
            })];
    });
}); };
exports.signOut = signOut;
