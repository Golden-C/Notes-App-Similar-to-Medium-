"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var folderSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Name is needed"],
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "noteUsers",
        required: [true, "Id is required"],
    },
    Notes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Note",
        },
    ],
}, {
    timestamps: true,
});
var Folder = mongoose_1.default.model("Folder", folderSchema);
exports.default = Folder;
