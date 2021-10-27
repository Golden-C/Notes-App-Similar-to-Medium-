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
var joi_1 = require("../middleware/joi");
var cloudimage_1 = require("../middleware/cloudimage");
var router = (0, express_1.Router)();
router.get('/allnotes', social_controller_1.getNotes);
router.get('/notesbytags', social_controller_1.notesByTags);
router.get('/trendingNotes', social_controller_1.getTrendingNotes);
router.post('/collab/:token', joi_1.joiValidateCollab, collaborators_Controller_1.confirmCollaborator);
router.use(authorization_passport_1.default);
router.get('/getfolder', folder_Controller_1.getFolder);
router.get('/getNotification', collaborators_Controller_1.getNotification);
router.get('/comments/:id', social_controller_1.getComment);
router.get('/desc', notes_Controller_1.sortByDesc);
router.post('/search', notes_Controller_1.sortByTitle);
router.post('/createFolder', folder_Controller_1.createFolder); //authorization required
router.get('/likes/:id', social_controller_1.getLikes);
router.put('/editnote/:noteId', notes_Controller_1.editNotes);
router.put('/addcomment/:noteId', social_controller_1.AddComment);
router.put('/addlike/:noteId', social_controller_1.AddLikes);
router.get('/delete/:_id', folder_Controller_1.trashNote);
router.get('/restoredelete/:_id', folder_Controller_1.restoreNote);
router.get('/permanentdelete/:_id', folder_Controller_1.permanentlyDeleteNote);
router.post('/createNote/:folderId', notes_Controller_1.createNote);
router.get('/:noteId/collaborators', notes_Controller_1.getCollaborators);
router.get('/collaborators/notes', notes_Controller_1.getCollaboratorsNotes);
router.get('/getAllNote/:folderId', notes_Controller_1.getAllNotes);
router.post('/invite/:noteId', collaborators_Controller_1.inviteCollborator);
router.get('/remove/:id', collaborators_Controller_1.removeCollaborator);
router.post('/admin/remove/:id', collaborators_Controller_1.adminRemoveCollaborator);
router.post('/upload/:upId', cloudimage_1.upload, collaborators_Controller_1.uploadFile);
router.get('/tests', function (req, res) {
    // let id = req.user.id
    res.send(req.user.id);
});
router.get('/:_id', folder_Controller_1.getNote);
module.exports = router;
