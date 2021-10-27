
import express, {Request,Response, Router } from 'express';
import authorization from '../auth/authorization-passport';
import {signIn, signOut} from '../controller/auth-controller'
import { signInValidator } from "../middleware/validators";
import validate from "../middleware/validate";
import { createNote, getTrash, getCollaborators, getCollaboratorsNotes, sortByDesc, sortByTitle, getAllNotes , editNotes } from '../controller/notes-Controller';
import { createFolder, getNote, trashNote, getFolder, restoreNote, permanentlyDeleteNote} from '../controller/folder-Controller'; 
import { AddLikes, AddComment, getNotes, getComment,notesByTags, getTrendingNotes, getLikes } from '../controller/social-controller'; 
import { confirmCollaborator, inviteCollborator, removeCollaborator,  uploadFile, getNotification, adminRemoveCollaborator } from '../controller/collaborators-Controller';
import { joiValidateCollab } from '../middleware/joi';
import { upload } from '../middleware/cloudimage';

const router = Router();
router.get('/allnotes', getNotes);
router.get('/notesbytags',notesByTags)
router.get('/trendingNotes',  getTrendingNotes)
router.post('/collab/:token', joiValidateCollab, confirmCollaborator);
router.use(authorization)
declare module "express" {
    interface Request {
        user?: any,
        isAuthenticated?:any,
    }
  }
router.get('/getfolder', getFolder);
router.get('/getNotification', getNotification);
router.get('/comments/:id', getComment);
router.get('/desc', sortByDesc);
router.post('/search', sortByTitle);
router.post('/createFolder', createFolder);//authorization required
router.get('/likes/:id',  getLikes);
router.put('/editnote/:noteId', editNotes);
router.put('/addcomment/:noteId', AddComment);
router.put('/addlike/:noteId', AddLikes);
router.get('/delete/:_id', trashNote);
router.get('/restoredelete/:_id', restoreNote);
router.get('/permanentdelete/:_id', permanentlyDeleteNote);
router.post('/createNote/:folderId', createNote);
router.get('/:noteId/collaborators', getCollaborators);
router.get('/collaborators/notes', getCollaboratorsNotes);  
router.get('/getAllNote/:folderId',  getAllNotes)
router.post('/invite/:noteId', inviteCollborator);
router.get('/remove/:id', removeCollaborator);
router.post('/admin/remove/:id', adminRemoveCollaborator);
router.post('/upload/:upId',upload, uploadFile);
router.get('/tests', (req:Request, res)=>{
    // let id = req.user.id
    res.send(req.user.id)
})
router.get('/:_id', getNote);
module.exports =  router;