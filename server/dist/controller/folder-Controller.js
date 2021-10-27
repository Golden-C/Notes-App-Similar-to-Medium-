"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permanentlyDeleteNote = exports.restoreNote = exports.trashNote = exports.getNote = exports.getFolder = exports.createFolder = void 0;
var folderModel_1 = __importDefault(require("../model/folderModel"));
var noteModel_1 = __importDefault(require("../model/noteModel"));
var can_user_edit_1 = require("../middleware/can-user-edit");
// create folders
var createFolder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createdBy, title, folderExist, folder, err_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                createdBy = req.user._id;
                title = req.body.title;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, folderModel_1.default.findOne({ title: title, createdBy: createdBy })];
            case 2:
                folderExist = _a.sent();
                if (folderExist)
                    return [2 /*return*/, res.send({ message: "Folder with such title already exists" })];
                return [4 /*yield*/, folderModel_1.default.create({ createdBy: createdBy, title: title })];
            case 3:
                folder = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        folder: folder,
                        message: "Folder created successfully"
                    })
                    //unforseen errors...
                ];
            case 4:
                err_1 = _a.sent();
                message = err_1.message || err_1;
                res.status(404).json({ error: message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createFolder = createFolder;
//get folders
var getFolder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createdBy, title, folderList, err_2, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                createdBy = req.user._id;
                console.log(createdBy);
                title = req.body.title;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, folderModel_1.default.find({ createdBy: createdBy })];
            case 2:
                folderList = _a.sent();
                if (folderList.length === 0)
                    return [2 /*return*/, res.status(400).json({ message: "You dont have any folder" })];
                return [2 /*return*/, res.status(200).json(folderList)
                    //unforseen errors...
                ];
            case 3:
                err_2 = _a.sent();
                message = err_2.message || err_2;
                res.status(404).json({ error: message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFolder = getFolder;
//get a note
var getNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, note, collaborator, isOwner, owner, ownerId, userid, err_3, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, noteModel_1.default.findById(_id).populate('createdBy').populate('collaboratorId')
                    // console.log(note)
                ];
            case 2:
                note = _a.sent();
                // console.log(note)
                if (!note)
                    return [2 /*return*/, res.status(404).json({ error: "Note not found" })];
                collaborator = note.collaboratorId.includes(req.user.id);
                isOwner = (0, can_user_edit_1.canEdit)(req.user.id, note._id);
                owner = note.createdBy;
                ownerId = owner.id;
                userid = req.user.id;
                if (!isOwner) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ error: "You are not authorized to view this note" })];
                }
                return [2 /*return*/, res.status(200).json(note)];
            case 3:
                err_3 = _a.sent();
                message = err_3.message || err_3;
                return [2 /*return*/, res.status(404).json({ error: message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getNote = getNote;
//delete note
var trashNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, note, userid, owner, err_4, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, noteModel_1.default.findById(_id)];
            case 2:
                note = _a.sent();
                if (!note)
                    return [2 /*return*/, res.status(404).json({ error: "Note not found" })];
                userid = req.user.id;
                owner = note.createdBy;
                if (owner != userid)
                    return [2 /*return*/, res
                            .status(404)
                            .json({ error: "You are not authorized to delete this note" })];
                if (Boolean(note.softDelete) == true)
                    return [2 /*return*/, res.status(400).json({ error: "This Note has been deleted" })];
                return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(_id, { softDelete: true }, { new: true })];
            case 3:
                _a.sent();
                res.status(200).json({ message: "Note Successfully Deleted" });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                message = err_4.message || err_4;
                return [2 /*return*/, res.status(404).json({ error: message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.trashNote = trashNote;
var restoreNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, note, userid, owner, err_5, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, noteModel_1.default.findById(_id)];
            case 2:
                note = _a.sent();
                if (!note)
                    return [2 /*return*/, res.status(404).json({ error: "Note not found" })];
                userid = req.user.id;
                owner = note.createdBy;
                if (owner != userid)
                    return [2 /*return*/, res
                            .status(404)
                            .json({ error: "You are not authorized to restore this note" })];
                if (Boolean(note.softDelete) == false)
                    return [2 /*return*/, res.status(400).json({ error: "This Note wasnt deleted" })];
                return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(_id, { softDelete: false }, { new: true })];
            case 3:
                _a.sent();
                res.status(200).json({ message: "Note Successfully Restored" });
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                message = err_5.message || err_5;
                return [2 /*return*/, res.status(404).json({ error: message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.restoreNote = restoreNote;
var permanentlyDeleteNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, note, userid, owner, err_6, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, noteModel_1.default.findById(_id)];
            case 2:
                note = _a.sent();
                if (!note)
                    return [2 /*return*/, res.status(404).json({ error: "Note not found" })];
                userid = req.user.id;
                owner = note.createdBy;
                if (owner != userid)
                    return [2 /*return*/, res
                            .status(404)
                            .json({ error: "You are not authorized to permanently this note" })];
                if (Boolean(note.softDelete) == false)
                    return [2 /*return*/, res.status(400).json({ error: "Move this note to trash by deleting it first" })];
                return [4 /*yield*/, noteModel_1.default.findByIdAndDelete(_id)];
            case 3:
                _a.sent();
                res.status(200).json({ message: "Note Permanently Deleted" });
                return [3 /*break*/, 5];
            case 4:
                err_6 = _a.sent();
                message = err_6.message || err_6;
                return [2 /*return*/, res.status(404).json({ error: message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.permanentlyDeleteNote = permanentlyDeleteNote;
