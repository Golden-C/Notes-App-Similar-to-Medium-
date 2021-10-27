import mongoose from "mongoose";
import notesUsers from "../model/signupModel";
import { CommentInterface } from "../interfaces/interface";

const commentSchema = new mongoose.Schema<CommentInterface>(
  {
    comment: {
      type: String,
      required: [true, "Comment is needed"],
    },
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "noteUsers",
      required: [true, "userId is required"],
    },
  },
  {timestamps: true,}
);

const Comment = mongoose.model<CommentInterface>("comments", commentSchema);

export default Comment;
