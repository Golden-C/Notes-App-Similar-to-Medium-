import express, { Request, Response, NextFunction } from "express";
import folders from "../model/folderModel";
import notesUsers from "../model/signupModel";
import notes from "../model/noteModel";
import mongoose, {ObjectId} from 'mongoose'
import {canEdit }from '../middleware/can-user-edit'
// import express, { User } from 'express'

declare module "express" {
  interface Request {
    user?: any;

  }
}

// create folders
export const createFolder = async (req: Request, res: Response) => {
  //created by related to the user id from the usermodel/ schema
  const { _id: createdBy } = req.user 

  //title as folder name from the folder schema
  const { title } = req.body;

  try {
    // create a folder in the folder schema =====> database=====>having the createdby and title

    const folderExist = await folders.findOne({title, createdBy});
    if(folderExist) return res.send({ message: "Folder with such title already exists"})
    const folder = await folders.create({ createdBy, title });
    return res.status(201).json({ 
      folder,
      message: "Folder created successfully"
    })
    //unforseen errors...
  } catch (err: any) {
    const message = err.message || err;
    res.status(404).json({ error: message });
  }
};
//get folders
export const getFolder = async (req: Request, res: Response) => {
  //created by related to the user id from the usermodel/ schema
  const { _id: createdBy } = req.user 
  console.log(createdBy)
  //title as folder name from the folder schema
  const { title } = req.body;

  try {
    // create a folder in the folder schema =====> database=====>having the createdby and title

    const folderList = await folders.find({createdBy});

    if(folderList.length === 0) return res.status(400).json({ message: "You dont have any folder"})
    
    return res.status(200).json(folderList)
    //unforseen errors...
  } catch (err: any) {
    const message = err.message || err;
    res.status(404).json({ error: message });
  }
};

//get a note
export const getNote = async (req: Request, res: Response) => {
  //getting the req parameter and initilizing to the noteid
  const { _id } = req.params;
  
  try {
    const note = await notes.findById(_id).populate('createdBy').populate('collaboratorId')
    // console.log(note)
    if (!note) return res.status(404).json({ error: "Note not found" });
    let collaborator = note.collaboratorId.includes(req.user!.id)
    let isOwner = canEdit(req.user.id, note._id)

    const owner: {id:string} = note.createdBy as unknown as {id:string};
    let ownerId = owner.id
    const userid = req.user!.id;
    
    if (!isOwner){
      return res
        .status(404)
        .json({ error: "You are not authorized to view this note" });
    }
    return res.status(200).json(note);
  } catch (err: any) {
    const message = err.message || err;
    return res.status(404).json({ error: message });
  }
};

//delete note
export const trashNote = async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const note = await notes.findById(_id);

    if (!note) return res.status(404).json({ error: "Note not found" });
    const userid = req.user!.id;
    const owner: string = note.createdBy as unknown as string;

    if (owner != userid )
      return res
        .status(404)
        .json({ error: "You are not authorized to delete this note" });

    if (Boolean(note.softDelete) == true)
      return res.status(400).json({ error: "This Note has been deleted" });

    await notes.findByIdAndUpdate(_id, { softDelete: true }, { new: true });
    
    res.status(200).json({ message: "Note Successfully Deleted" });
  } catch (err: any) {
    const message = err.message || err;
    return res.status(404).json({ error: message });
  }
};

export const restoreNote = async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const note = await notes.findById(_id);

    if (!note) return res.status(404).json({ error: "Note not found" });
    const userid = req.user!.id;
    const owner: string = note.createdBy as unknown as string;

    if (owner != userid )
      return res
        .status(404)
        .json({ error: "You are not authorized to restore this note" });

    if (Boolean(note.softDelete) == false)
      return res.status(400).json({ error: "This Note wasnt deleted" });

    await notes.findByIdAndUpdate(_id, { softDelete: false }, { new: true });
    
    res.status(200).json({ message: "Note Successfully Restored" });
  } catch (err: any) {
    const message = err.message || err;
    return res.status(404).json({ error: message });
  }
};

export const permanentlyDeleteNote = async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const note = await notes.findById(_id);

    if (!note) return res.status(404).json({ error: "Note not found" });
    const userid = req.user!.id;
    const owner: string = note.createdBy as unknown as string;

    if (owner != userid )
      return res
        .status(404)
        .json({ error: "You are not authorized to permanently this note" });

    if (Boolean(note.softDelete) == false)
      return res.status(400).json({ error: "Move this note to trash by deleting it first" });

    await notes.findByIdAndDelete(_id);
    
    res.status(200).json({ message: "Note Permanently Deleted" });
  } catch (err: any) {
    const message = err.message || err;
    return res.status(404).json({ error: message });
  }
};