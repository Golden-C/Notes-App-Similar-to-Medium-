"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: function (req, file, callback) {
        var ext = path_1.default.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf' && ext !== '.docx' && ext !== '.doc' && ext !== '.zip') {
            callback(new Error('File type is not supported.'), false);
            return;
        }
        callback(null, true);
    }
}).single('avatar');
