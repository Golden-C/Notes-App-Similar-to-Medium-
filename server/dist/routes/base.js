"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authorization_passport_1 = __importDefault(require("../auth/authorization-passport"));
var notes_Controller_1 = require("../controller/notes-Controller");
var folder_Controller_1 = require("../controller/folder-Controller");
var social_controller_1 = require("../controller/social-controller");
var collaborators_Controller_1 = require("../controller/collaborators-Controller");
var router = (0, express_1.Router)();
router.use(authorization_passport_1.default);
router.get('/getfolder', folder_Controller_1.getFolder);
router.get('/:id', social_controller_1.getComment);
router.get('/gettrash', notes_Controller_1.getTrash);
router.get('/desc', notes_Controller_1.sortByDesc);
router.post('/search', notes_Controller_1.sortByTitle);
router.post('/createFolder', folder_Controller_1.createFolder); //authorization required
router.get('/getNotification', collaborators_Controller_1.getNotification);
router.get('/:_id', folder_Controller_1.getNote);
router.get('/likes/:id', social_controller_1.getLikes);
module.exports = router;
