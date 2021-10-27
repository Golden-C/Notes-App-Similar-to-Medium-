"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var noteSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "notesusers",
        },
    ],
    tags: {
        type: [String],
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "notesusers",
        required: true,
    },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'notesusers' }],
    comment: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'comments' }],
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
}, {
    timestamps: true
});
var Note = mongoose_1.default.model("Note", noteSchema);
exports.default = Note;
