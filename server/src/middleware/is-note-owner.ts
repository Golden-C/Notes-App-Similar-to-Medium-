import mongoose from 'mongoose'
import Note from "../model/noteModel";

async function noteOwner (user:string,noteid:string) {

    const isOwner = await Note.findById(user, {createdBy:user})
}