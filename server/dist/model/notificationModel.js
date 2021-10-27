"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var NotificationSchema = new Schema({
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
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('notifications', NotificationSchema);
