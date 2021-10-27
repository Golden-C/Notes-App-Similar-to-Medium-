"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NM_EMAIL,
        pass: process.env.NM_PASS,
    }
});
var sendMail = function (subject, Email, body) {
    var mailOptions = {
        from: process.env.NM_EMAIL,
        to: Email,
        subject: subject,
        html: body
    };
    return transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurred: ', err);
        }
        // console.log( data)
    });
};
exports.default = sendMail;
