"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
// import userController from './user.controller';
var router = express_1.default.Router();
router.get('/auth/facebook', passport_1.default.authenticate('facebook'));
router.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
    successRedirect: '/testing',
    failureRedirect: '/testing/fail',
}));
router.get('/fail', function (req, res) {
    res.status(400).send('Failed attempt');
});
router.get('/', function (req, res) {
    res.send('Success');
});
module.exports = router;
