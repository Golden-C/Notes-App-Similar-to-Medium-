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
router.use(authorization)
declare module "express" {
    interface Request {
        user?: any,
        isAuthenticated?:any,
    }
  }

router.get('/getfolder', getFolder);
router.get('/:id', getComment);
router.get('/gettrash', getTrash);
router.get('/desc', sortByDesc);
router.post('/search', sortByTitle);
router.post('/createFolder', createFolder);//authorization required
router.get('/getNotification', getNotification);
router.get('/:_id', getNote);
router.get('/likes/:id',  getLikes);


module.exports =  router;