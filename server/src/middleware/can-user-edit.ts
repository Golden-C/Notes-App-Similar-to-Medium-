import mongoose from 'mongoose'
import Note from '../model/noteModel';
import NoteInterface from '../interfaces/interface'

export const canEdit = async(user:string, note:string)=>{
    const noteDetails = await Note.findById(note)
    if(!noteDetails)return false

    let collaborator = noteDetails.collaboratorId.includes(user)
    
    let ownerId = (noteDetails.createdBy).toString() as unknown as string

    const isOwner = ownerId == user.toString()
    
    if(collaborator || isOwner){
        return true
    }
    return false
 }