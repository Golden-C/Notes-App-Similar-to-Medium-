"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authorization_passport_1 = __importDefault(require("../auth/authorization-passport"));
var cloudimage_1 = require("../middleware/cloudimage");
var auth_controller_1 = require("../controller/auth-controller");
var validators_1 = require("../middleware/validators");
var validate_1 = __importDefault(require("../middleware/validate"));
var joi_1 = require("../middleware/joi");
var users_1 = require("../controller/users");
var router = express_1.default.Router();
router.get('/logout', auth_controller_1.signOut);
router.post('/login', validators_1.signInValidator, validate_1.default, auth_controller_1.signIn);
router.post('/signup', joi_1.joiValidateSignup, users_1.createUsers);
router.get('/confirm/:token', users_1.confirmUsers);
router.put('/update', authorization_passport_1.default, cloudimage_1.upload, users_1.updateUser);
router.get('/recovery-email', users_1.getEmailFromUser);
router.post('/recovery-email', users_1.resetPasswordLink);
router.get('/reset/:token', users_1.displayNewPasswordForm);
router.post('/reset', users_1.processNewPasswordFromUser);
router.post('/changePassword', authorization_passport_1.default, users_1.changePassword);
router.get('/profile', authorization_passport_1.default, function (req, res, next) {
    res.send(req.user);
});
module.exports = router;
