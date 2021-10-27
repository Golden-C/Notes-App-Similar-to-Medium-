import { Request, Response, NextFunction } from 'express';
import Note from '../model/noteModel';
import jwt from 'jsonwebtoken';
import { collabInt } from '../interfaces/interface';
import notesUsers from '../model/signupModel';
import  Notification from '../model/notificationModel';
import sendEmail from '../nodemailer';
import { sendNotification } from '../middleware/send-notification';
import { collabToken } from '../middleware/joi';
const EmailValidator = require('email-deep-validator');
const emailValidator = new EmailValidator();
const cloudinary = require('cloudinary').v2;
const secret: string = process.env.ACCESS_TOKEN_SECRET as string;


export async function inviteCollborator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = req.body;
    let id =  req.params.noteId
    let finder = await notesUsers.findOne({email})
    if (req.user.email === email) return res.status(404).send({msg: "Note owner cannot be a Collaborator"}) 
    if(finder) {
      let noteFinder = await Note.findByIdAndUpdate(id, { "$addToSet": {collaboratorId:finder._id}}, {new:false})  
      
      if (noteFinder.collaboratorId.includes(finder._id)) return res.status(404).send({msg: "Already a Collaborator"}) 
        
      let content = `You have been added as a contributor to  ${noteFinder.title} note`
      sendNotification(email, content, noteFinder._id)
      res.status(201).send({ msg: 'Notification Sent' });
      return
    }
    const { validDomain }= await emailValidator.verify(email)
    if (!validDomain) {
      res.status(404).send({ msg: 'Please provide a valid email address' });
      return
    }
    
    const user:collabInt = {
        email,
        id
    }
    let token = await collabToken(user);
    const subject = 'Invitation to Collaborate on  Note'
    const body = `
    <h2>Please click on the given <a href="http://localhost:3000/collaboratorsignup/${token}">link</a> to register your acount.</h2>
    `
    //email services
    if (process.env.CONDITION !== 'test'){
      await sendEmail(subject, email, body)
    }
    res.status(201).json({ msg: 'A mail has been sent to you to register!!!',token:token});
    return
  } catch (err: any) {
    res.status(404).send({ error: err.message });
    return;
  }
}

export async function confirmCollaborator(
    req: Request,
    res: Response,
    next: NextFunction,
){
    try{
        const { firstName, lastName, password, confirm_password } = req.body
        if ( password !== confirm_password ) {
            res.status(404).send({msg: "Password do not match"});
            return;
        }
        const decoded:any = jwt.verify(req.params.token, secret);
        const { email, id } = decoded.args
        if (!decoded.args) {
            throw new Error("Thrown here");
        }
        let newUser = await notesUsers.create({
            firstName,
            lastName,
            email,
            password
        })
        let noteFinder = await Note.findByIdAndUpdate(id, { "$addToSet": {collaboratorId:newUser._id}}, {new:true})  
        res.status(201).send({ msg: 'Created Successful!!!' });

    } catch (err: any) {
        res.status(404).send({ error: err.message });
        return;
    }
}

export async function removeCollaborator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let finder = await Note.findByIdAndUpdate(req.params.id, { "$pull": {collaboratorId:req.user._id}}, {new:true}) 
    let content = `You have Successfully been removed from ${finder.title} note`
    await sendNotification(req.user.email, content, finder._id)
    res.status(201).send({ msg: 'Removed Successful!!!' });
  } catch (err: any) {
    res.status(404).send({ error: err.message });
    return;
  }
}

export async function adminRemoveCollaborator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = req.body;
    let id =  req.params.id
    let finder : any = await Note.findOne({email})
    if(!finder) return res.status(404).send({error: "Not a user"})
    if (email === req.user.email) return res.status(404).send({msg: "Note Owner cannot be remove"})
    let result = await Note.findByIdAndUpdate(id, { "$pull": {collaboratorId:finder._id}}, {new:true}) 
    let content = `Collaborator has been Successfully removed from ${finder.title} note`
    await sendNotification(email, content, finder._id)
    res.status(201).send({ msg: 'Removed Successful!!!' });
  } catch (err: any) {
    res.status(404).send({ error: err.message });
    return;
  }
}

export async function uploadFile( 
    req: Request,
    res: Response,
    next: NextFunction,
  ){
    try {
      let id = req.params.upId;
      if (req.file) {
         const result = await cloudinary.uploader.upload(req.file?.path);
         let user = await Note.findByIdAndUpdate(id, { "$addToSet": {fileUpload:result.url}}, {new:true}) 
         res.status(200).send(user)
         return
      }
      return res.status(404).send({ error: "Please input a file"});
    } catch (err: any) {
      res.status(404).send({ error: err.message });
      return;
    }
}

export async function getNotification (req: Request, res: Response): Promise<void> {
    const userId = req.user.id
  let notifications = await Notification.find({userId})
  console.log(notifications)
  if(notifications.length === 0){
     res.status(200).send('You dont have any notifications at the moment')
     return 
  }
  res.status(200).json(notifications)
  return 
}


