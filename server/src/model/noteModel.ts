import mongoose from "mongoose";
import  { NoteInterface } from "../interfaces/interface";

const noteSchema = new mongoose.Schema<NoteInterface>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
    collaboratorId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notesusers",
      },
    ],
    tags: {
      type: [String],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notesusers",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notesusers' }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
    folderId: {
      type: String,
      required: true,
    },
    softDelete: {
      type: Boolean,
      default: false,
      required: true,
    },
    fileUpload: [
      { type: String },
    ],
  },
  { 
    timestamps: true 
  }
);

const Note = mongoose.model<NoteInterface>("Note", noteSchema);

export default Note;
