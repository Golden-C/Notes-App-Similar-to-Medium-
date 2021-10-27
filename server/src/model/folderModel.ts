import mongoose from "mongoose";
import notesUsers from "../model/signupModel";
import { FolderInterface } from "../interfaces/interface";

const folderSchema = new mongoose.Schema<FolderInterface>(
  {
    title: {
      type: String,
      required: [true, "Name is needed"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "noteUsers",
      required: [true, "Id is required"],
    },
    Notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Folder = mongoose.model<FolderInterface>("Folder", folderSchema);

export default Folder;
