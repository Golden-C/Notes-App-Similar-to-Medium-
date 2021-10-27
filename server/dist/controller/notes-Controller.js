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
exports.getTrash = exports.getAllNotes = exports.sortByDesc = exports.getCollaboratorsNotes = exports.getCollaborators = exports.createNote = exports.editNotes = exports.sortByTitle = void 0;
var folderModel_1 = __importDefault(require("../model/folderModel"));
var noteModel_1 = __importDefault(require("../model/noteModel"));
var can_user_edit_1 = require("../middleware/can-user-edit");
//Function to create notes
function createNote(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var folderId, _a, title, body, tags, user, createdBy, folderExist, note, noteCreated, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    folderId = req.params.folderId;
                    _a = req.body, title = _a.title, body = _a.body, tags = _a.tags;
                    user = req.user;
                    createdBy = user.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, folderModel_1.default.findById(folderId)];
                case 2:
                    folderExist = _b.sent();
                    if (!folderExist) return [3 /*break*/, 4];
                    note = {
                        title: title,
                        body: body,
                        tags: tags,
                        folderId: folderId,
                        createdBy: createdBy,
                    };
                    return [4 /*yield*/, noteModel_1.default.create(note)
                        // await Folder.findByIdAndUpdate(folderExist._id, { "$addToSet": {fileUpload:result.url}}, {new:true}) 
                    ];
                case 3:
                    noteCreated = _b.sent();
                    // await Folder.findByIdAndUpdate(folderExist._id, { "$addToSet": {fileUpload:result.url}}, {new:true}) 
                    return [2 /*return*/, res.status(201).json({ noteCreated: noteCreated, message: "Notes created successfully" })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    // console.log(err, 'err');
                    res.status(404).json({
                        error: err_1.message,
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createNote = createNote;
// async function getCollaborators(req: Request, res: Response) {
//   const { noteId } = req.params;
//   try {
//     const note = await Note.findById(noteId).populate("collaboratorId");
//     if (!note) return res.status(404).json({ error: 'Note does not exist' });
//     return res.status(200).json({
//       collaborators: note.collaboratorId,
//     });
//   } catch (err: any) {
//     console.log(err)
//     res.status(400).json({
//       error: err.message,
//     });
//   }
// }
function getCollaborators(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var noteId, note, collaborators, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    noteId = req.params.noteId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, noteModel_1.default.findById(noteId).populate('collaboratorId', {
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                        })];
                case 2:
                    note = _a.sent();
                    if (!note)
                        return [2 /*return*/, res.status(404).json({ error: 'Note does not exist' })];
                    collaborators = note.collaboratorId;
                    if (!collaborators)
                        return [2 /*return*/, res
                                .status(404)
                                .json({ error: 'collaborator details not available' })];
                    return [2 /*return*/, res.status(200).json({
                            collaborators: collaborators,
                        })];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, res.status(400).json({
                            error: err_2.message,
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getCollaborators = getCollaborators;
function getCollaboratorsNotes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var collaboratorId, notes, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collaboratorId = req.user.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, noteModel_1.default.find({ collaboratorId: collaboratorId }).select('-collaboratorId -createdBy -softDelete -createdAt  -__v -avatar')];
                case 2:
                    notes = _a.sent();
                    if (!notes) {
                        return [2 /*return*/, res.status(404).json({ error: 'Collaborator has no notes' })];
                    }
                    return [2 /*return*/, res.status(200).json({ notes: notes })];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, res.status(400).json({
                            error: err_3.message,
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getCollaboratorsNotes = getCollaboratorsNotes;
var getAllNotes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, folderId, notes, err_4, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.user.email;
                folderId = req.params.folderId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, noteModel_1.default.find({
                        folderId: folderId,
                        softDelete: false,
                        createdBy: req.user.id,
                    }).sort('-updatedAt')];
            case 2:
                notes = _a.sent();
                // if (notes.length === 0) {
                //   return res.status(404).send('No Notes found');
                // }
                return [2 /*return*/, res.status(200).json(notes)];
            case 3:
                err_4 = _a.sent();
                message = err_4.message || err_4;
                return [2 /*return*/, res.status(500).json({ error: message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllNotes = getAllNotes;
function sortByDesc(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var input, result, searchObj, updateByLatest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = req.query.sort;
                    result = '';
                    if (input === 'ascending') {
                        result = '-updatedAt';
                    }
                    else if (input === 'descending') {
                        result = 'updatedAt';
                    }
                    else if (input === 'title') {
                        result = 'title';
                    }
                    else if (input === 'untitle') {
                        result = '-title';
                    }
                    else {
                        return [2 /*return*/, res.status(404).send('Invalid Sort')];
                    }
                    console.log("Input from url", input);
                    searchObj = {
                        $and: [
                            { createdBy: req.user.id },
                            { softDelete: false },
                        ]
                    };
                    return [4 /*yield*/, noteModel_1.default.find(searchObj).sort(result)
                        // const updateByLatest = await Note.find({updatedAt:"1"})
                        //let latest = updateByLatest[0]
                        // console.log('Latest Update', updateByLatest);
                        // if (updateByLatest.length === 0) {
                        //   return res.status(200).send('No Notes found');
                        // }
                    ];
                case 1:
                    updateByLatest = _a.sent();
                    // const updateByLatest = await Note.find({updatedAt:"1"})
                    //let latest = updateByLatest[0]
                    // console.log('Latest Update', updateByLatest);
                    // if (updateByLatest.length === 0) {
                    //   return res.status(200).send('No Notes found');
                    // }
                    return [2 /*return*/, res.status(201).json(updateByLatest)];
            }
        });
    });
}
exports.sortByDesc = sortByDesc;
function sortByTitle(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var searchObj, searchResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchObj = req.body.sort;
                    if (req.body.sort !== undefined) {
                        searchObj = {
                            $and: [
                                { title: { $regex: req.body.sort, $options: "i" } },
                                { createdBy: req.user.id },
                                { softDelete: false },
                            ]
                        };
                    }
                    return [4 /*yield*/, noteModel_1.default.find(searchObj).sort("-updatedAt")];
                case 1:
                    searchResult = _a.sent();
                    if (searchResult.length === 0)
                        return [2 /*return*/, res.status(200).json({ message: "No note matches your search criteria" })];
                    res.status(200).send(searchResult);
                    return [2 /*return*/];
            }
        });
    });
}
exports.sortByTitle = sortByTitle;
;
var editNotes = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var noteId, _a, title, body, tags, userid, isAllowed, update;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                noteId = req.params.noteId;
                _a = req.body, title = _a.title, body = _a.body, tags = _a.tags;
                userid = req.user._id;
                return [4 /*yield*/, (0, can_user_edit_1.canEdit)(userid, noteId)];
            case 1:
                isAllowed = _b.sent();
                if (!isAllowed) {
                    return [2 /*return*/, res.status(401).send({ error: "You are not authorized to edit this note" })];
                }
                return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(noteId, { title: title, body: body, tags: tags })];
            case 2:
                update = _b.sent();
                if (!update) {
                    return [2 /*return*/, res.status(404).send({ error: "An error occurred while updating" })];
                }
                return [2 /*return*/, res.status(200).send({ message: "Note has been sucessfully updated" })];
        }
    });
}); };
exports.editNotes = editNotes;
var getTrash = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, searchObj, trashResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.user._id;
                searchObj = {
                    $and: [
                        { createdBy: req.user.id },
                        { softDelete: true },
                    ]
                };
                return [4 /*yield*/, noteModel_1.default.find(searchObj)];
            case 1:
                trashResult = _a.sent();
                if (trashResult) {
                    return [2 /*return*/, res.status(200).send(trashResult)];
                }
                return [2 /*return*/, res.status(500).send('An error Occured')];
        }
    });
}); };
exports.getTrash = getTrash;
