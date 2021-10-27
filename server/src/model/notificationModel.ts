import mongoose,{ObjectId} from 'mongoose';
import bcrypt from 'bcryptjs';
import { notificationsInterface } from '../interfaces/interface';

export interface NotificationDocument extends mongoose.Document {
    content : string;
    noteId: ObjectId;
    userId: ObjectId;
    }


const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is needed'],
    },
    noteId: {
        type: Schema.Types.ObjectId,
        ref: 'notes',
      required: [true, 'NoteId is needed'],
    },
    userId: {
       type: Schema.Types.ObjectId, 
       ref: 'noteusers',
      required: [true, 'UserId is needed'],
    },
    
  },
  {
    timestamps: true,
  }
);


export default mongoose.model<NotificationDocument>('notifications', NotificationSchema);