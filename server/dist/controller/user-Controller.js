"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var passport_facebook_1 = require("passport-facebook");
// const  strategy = require('passport-facebook')
var signupModel_1 = __importDefault(require("../model/signupModel"));
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        signupModel_1.default.findById(id, function (user) {
            done(null, user);
        });
    });
    passport.use(new passport_facebook_1.Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        profileFields: ['email', 'name'],
    }, function (accessToken, refreshToken, profile, done) {
        var _a = profile._json, email = _a.email, first_name = _a.first_name, last_name = _a.last_name, id = _a.id; //password
        var userData = {
            email: email,
            firstName: first_name,
            lastName: last_name,
            facebookId: id
        };
        signupModel_1.default.findOne({ email: email }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            }
            if (!user) {
                new signupModel_1.default(userData).save();
                // console.log(userData);
                return done(null, userData);
            }
        });
    }));
};
