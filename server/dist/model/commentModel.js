"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var commentSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
        required: [true, "Comment is needed"],
    },
    commenter: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "noteUsers",
        required: [true, "userId is required"],
    },
}, { timestamps: true, });
var Comment = mongoose_1.default.model("comments", commentSchema);
exports.default = Comment;
