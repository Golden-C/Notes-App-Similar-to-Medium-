import express, { Request, Response, NextFunction } from 'express';
import Folder from '../model/folderModel';
import Note from '../model/noteModel';
import {canEdit} from '../middleware/can-user-edit'
import { AsyncResource } from 'async_hooks';
import noteUsers from '../model/signupModel';

declare module 'express' {
  interface Request {
    user?: any;
    isAuthenticated?: any;
  }
}

interface collaboratorsDetailsInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // folderId: string;
}

//Function to create notes
async function createNote(req: Request, res: Response, next: NextFunction) {
  const folderId = req.params.folderId;
  const { title, body, tags } = req.body;
  let user = req.user;
  let createdBy = user.id;
  // if(user) createdBy = user.id;
  // else createdBy = req.body.createdBy

  try {
    const folderExist = await Folder.findById(folderId);    
    // const noteExist = await Note.findOne({folderId, title, softDelete: false});    
    // if(noteExist)return res.status(400).send({message: "A note with this title already exist in this folder please choose a different title"})
    if (folderExist) {
      const note = {
        title,
        body,
        tags,
        folderId,
        createdBy,
      };
      let noteCreated = await Note.create(note)
      // await Folder.findByIdAndUpdate(folderExist._id, { "$addToSet": {fileUpload:result.url}}, {new:true}) 
      return res.status(201).json({noteCreated, message: "Notes created successfully"})
    }
  } catch (err: any) {
    // console.log(err, 'err');
    res.status(404).json({
      error: err.message,
    });
  }
}

// async function getCollaborators(req: Request, res: Response) {
//   const { noteId } = req.params;
//   try {

//     const note = await Note.findById(noteId).populate("collaboratorId");

//     if (!note) return res.status(404).json({ error: 'Note does not exist' });

//     return res.status(200).json({
//       collaborators: note.collaboratorId,
//     });
//   } catch (err: any) {
//     console.log(err)
//     res.status(400).json({
//       error: err.message,
//     });
//   }
// }

async function getCollaborators(
  req: Request,
  res: Response
): Promise<string[] | any> {
  const { noteId } = req.params;
  try {
    const note = await Note.findById(noteId).populate('collaboratorId', {
      firstName: 1,
      lastName: 1,
      email: 1,
    });

    if (!note) return res.status(404).json({ error: 'Note does not exist' });

    const collaborators = note.collaboratorId;

    if (!collaborators)
      return res
        .status(404)
        .json({ error: 'collaborator details not available' });

    return res.status(200).json({
      collaborators,
    });
  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function getCollaboratorsNotes(req: Request, res: Response) {
  const collaboratorId = req.user.id;

  try {
    const notes: any = await Note.find({ collaboratorId }).select(
      '-collaboratorId -createdBy -softDelete -createdAt  -__v -avatar'
    );

    if (!notes) {
      return res.status(404).json({ error: 'Collaborator has no notes' });
    }

    return res.status(200).json({ notes });
  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

const getAllNotes = async (req: Request, res: Response) => {
  const { email } = req.user as { [key: string]: string };
  const { folderId } = req.params;
  try {
    const notes = await Note.find({
      folderId,
      softDelete: false,
      createdBy: req.user.id,
    }).sort('-updatedAt');

    // if (notes.length === 0) {
    //   return res.status(404).send('No Notes found');
    // }
    return res.status(200).json(notes);
  } catch (err: any) {
    const message = err.message || err;
    return res.status(500).json({ error: message });
  }
};

async function sortByDesc(req: Request, res: Response, next: NextFunction) {
  const input = req.query.sort;
  let result = '';
  if (input === 'ascending') {
    result = '-updatedAt';
  } else if (input === 'descending') {
    result = 'updatedAt';
  } else if (input === 'title'){
    result = 'title'
  }else if (input === 'untitle'){
    result = '-title'
  }else {
    return res.status(404).send('Invalid Sort');
  }

  console.log("Input from url",input)
  const searchObj = {
    $and: [
        { createdBy: req.user.id},
        { softDelete: false },
    ]
}
const updateByLatest = await Note.find(searchObj).sort(result)
// const updateByLatest = await Note.find({updatedAt:"1"})
//let latest = updateByLatest[0]

  // console.log('Latest Update', updateByLatest);
  // if (updateByLatest.length === 0) {
  //   return res.status(200).send('No Notes found');
  // }
  return res.status(201).json(updateByLatest);
}

export async function sortByTitle(req:Request,res:Response,next:NextFunction){
  let searchObj = req.body.sort

  if(req.body.sort !== undefined){
      searchObj = {
              $and: [
                  { title: { $regex: req.body.sort, $options: "i" }},
                  { createdBy: req.user.id},
                  { softDelete: false },
              ]
          }
  }
  
const searchResult = await Note.find(searchObj).sort("-updatedAt")

if(searchResult.length === 0 ) return res.status(200).json({message:"No note matches your search criteria"})
res.status(200).send(searchResult)
};


const editNotes = async(req:Request,res:Response,next:NextFunction)=>{
  const {noteId} = req.params
  const {title, body, tags} = req.body

  let userid = req.user._id

  let isAllowed = await canEdit(userid , noteId)
  if(!isAllowed){
    return res.status(401).send({error:"You are not authorized to edit this note"})
  }
  
  const update = await Note.findByIdAndUpdate(noteId , {title, body, tags})
  if(!update){
    return res.status(404).send({error:"An error occurred while updating"})
  }

  return res.status(200).send({message:"Note has been sucessfully updated"})

}
const getTrash =  async(req:Request,res:Response,next:NextFunction)=>{
  let id  = req.user._id

  let searchObj = {
      $and: [
        { createdBy: req.user.id},
        { softDelete: true },
    ]
    
}

const trashResult = await Note.find(searchObj)
if(trashResult){
  return res.status(200).send(trashResult)
}
return res.status(500).send('An error Occured')
console.log(trashResult)
}

export { 
  editNotes,
  createNote, 
  getCollaborators,
  getCollaboratorsNotes,
  sortByDesc,
  getAllNotes,
  getTrash
  // sortByTitle
};
