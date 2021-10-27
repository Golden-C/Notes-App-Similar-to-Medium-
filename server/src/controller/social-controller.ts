import { Request, Response, NextFunction } from "express";
require('../model/commentModel')
import Note from '../model/noteModel';
import Comment from '../model/commentModel';

const AddLikes = async(req: Request, res: Response) =>{

    const {noteId} = req.params
    const userId = req.user._id
    
const noteDetails = await Note.findById(noteId)

if(!noteDetails){
    return res.status(404).json({message:'Note Dosent Exist'})
}

let isLiked  = (noteDetails.likes.includes(userId)) ? true : false
console.log(isLiked, userId)
let option = isLiked ?  "$pull" :"$addToSet" ;


let updatedNoteLikes = await Note.findByIdAndUpdate(
    noteId,
    { [option]: { likes: userId } },
    { new: true }
  ).catch((error: Error) => {
    console.log(error);
    res.status(400).send('An error Occured');
  });

return res.status(200).json(updatedNoteLikes)
}

const AddComment = async(req: Request, res: Response) =>{

    const {noteId} = req.params
    const {comment} = req.body
    const userId = req.user._id

    const noteDetails = await Note.findById(noteId)
    if(!noteDetails){
        return res.status(404).json({message:'Note Dosent Exist'})
    }
let newComment = {
    comment,
    commenter: userId
}
    let createdComment = await Comment.create(newComment)

    if(!createdComment){
        return res.sendStatus(500)
    }

    const commentId = createdComment._id

    let updatedNotecomments = await Note.findByIdAndUpdate(
        noteId,
        { "$addToSet": { comment: commentId } },
        { new: true }
      ).catch((error: Error) => {
        console.log(error);
        res.status(400).send('An error Occured');
      });
// let testNote = await Note.findById('6174045a12f3f7e3efe3b1d5').populate('comment')
      return res.status(200).json({updatedNotecomments})
}

export async function getComment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
        const id = req.params.id
      let finder = await Note.findOne({_id:id}).populate('comment')
        if (!finder?.comment){
            return res.status(404).send({msg: "These Note has no Comment"}); 
        }
      res.status(201).send(finder);
    } catch (err: any) {
      res.status(404).send({ error: err.message });
      return;
    }
}


export async function getNotes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
      console.log("here")
    let finder = await Note.find().sort({createdAt:-1}).populate('createdBy') 
      if (!finder){
          return res.status(404).send({msg: "There is no available Note at the Moment"}); 
      }
    res.status(201).send(finder);
  } catch (err: any) {
    res.status(404).send({ error: err.message });
    return;
  }
}

export async function notesByTags(req:Request,res:Response,next:NextFunction){

 const {tag } = req.body
 let getTag = await Note.find({tags: tag })
 if(!getTag){ return res.status(404) }
 res.status(200).send(getTag)
};

async function getLikes(req: Request, res: Response, ) {
    const noteID = req.params.id
    const note = await Note.findById(noteID)
    if(!note) {
        return res.status(404).json({ message: "Note not found" })
    }
    const likes = note.likes.length
    return res.status(200).json(likes)
}
async function getTrendingNotes(req: Request, res: Response, ) {
    const notes : any = await Note.find({ "createdAt": { $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000))) }}).populate('createdBy')      
    const trendingNotes = notes.sort((a:any,b:any) => {
    if(b.likes > a.likes ) return 1
    else return -1
  })
  res.status(200).send(trendingNotes)
}




export {AddLikes, AddComment,  getLikes,  getTrendingNotes}