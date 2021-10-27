import mongoose from 'mongoose'
import notesUsers from '../model/signupModel';
import Notification from '../model/notificationModel';

async function sendNotification (email:string, content:string, notesID:string){

    const isUser = await notesUsers.findOne({email})
    if(isUser){
        const notification = {
            content: content,
            userId: isUser._id,
            noteId: notesID
        }
      const not = await Notification.create(notification)
        return
    }

}

export {sendNotification}