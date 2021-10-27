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
exports.getTrendingNotes = exports.getLikes = exports.AddComment = exports.AddLikes = exports.notesByTags = exports.getNotes = exports.getComment = void 0;
require('../model/commentModel');
var noteModel_1 = __importDefault(require("../model/noteModel"));
var commentModel_1 = __importDefault(require("../model/commentModel"));
var AddLikes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var noteId, userId, noteDetails, isLiked, option, updatedNoteLikes;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                noteId = req.params.noteId;
                userId = req.user._id;
                return [4 /*yield*/, noteModel_1.default.findById(noteId)];
            case 1:
                noteDetails = _b.sent();
                if (!noteDetails) {
                    return [2 /*return*/, res.status(404).json({ message: 'Note Dosent Exist' })];
                }
                isLiked = (noteDetails.likes.includes(userId)) ? true : false;
                console.log(isLiked, userId);
                option = isLiked ? "$pull" : "$addToSet";
                return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(noteId, (_a = {}, _a[option] = { likes: userId }, _a), { new: true }).catch(function (error) {
                        console.log(error);
                        res.status(400).send('An error Occured');
                    })];
            case 2:
                updatedNoteLikes = _b.sent();
                return [2 /*return*/, res.status(200).json(updatedNoteLikes)];
        }
    });
}); };
exports.AddLikes = AddLikes;
var AddComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var noteId, comment, userId, noteDetails, newComment, createdComment, commentId, updatedNotecomments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                noteId = req.params.noteId;
                comment = req.body.comment;
                userId = req.user._id;
                return [4 /*yield*/, noteModel_1.default.findById(noteId)];
            case 1:
                noteDetails = _a.sent();
                if (!noteDetails) {
                    return [2 /*return*/, res.status(404).json({ message: 'Note Dosent Exist' })];
                }
                newComment = {
                    comment: comment,
                    commenter: userId
                };
                return [4 /*yield*/, commentModel_1.default.create(newComment)];
            case 2:
                createdComment = _a.sent();
                if (!createdComment) {
                    return [2 /*return*/, res.sendStatus(500)];
                }
                commentId = createdComment._id;
                return [4 /*yield*/, noteModel_1.default.findByIdAndUpdate(noteId, { "$addToSet": { comment: commentId } }, { new: true }).catch(function (error) {
                        console.log(error);
                        res.status(400).send('An error Occured');
                    })];
            case 3:
                updatedNotecomments = _a.sent();
                // let testNote = await Note.findById('6174045a12f3f7e3efe3b1d5').populate('comment')
                return [2 /*return*/, res.status(200).json({ updatedNotecomments: updatedNotecomments })];
        }
    });
}); };
exports.AddComment = AddComment;
function getComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, finder, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, noteModel_1.default.findOne({ _id: id }).populate('comment')];
                case 1:
                    finder = _a.sent();
                    if (!(finder === null || finder === void 0 ? void 0 : finder.comment)) {
                        return [2 /*return*/, res.status(404).send({ msg: "These Note has no Comment" })];
                    }
                    res.status(201).send(finder);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(404).send({ error: err_1.message });
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getComment = getComment;
function getNotes(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var finder, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("here");
                    return [4 /*yield*/, noteModel_1.default.find().sort({ createdAt: -1 }).populate('createdBy')];
                case 1:
                    finder = _a.sent();
                    if (!finder) {
                        return [2 /*return*/, res.status(404).send({ msg: "There is no available Note at the Moment" })];
                    }
                    res.status(201).send(finder);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    res.status(404).send({ error: err_2.message });
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getNotes = getNotes;
function notesByTags(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, getTag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = req.body.tag;
                    return [4 /*yield*/, noteModel_1.default.find({ tags: tag })];
                case 1:
                    getTag = _a.sent();
                    if (!getTag) {
                        return [2 /*return*/, res.status(404)];
                    }
                    res.status(200).send(getTag);
                    return [2 /*return*/];
            }
        });
    });
}
exports.notesByTags = notesByTags;
;
function getLikes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var noteID, note, likes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    noteID = req.params.id;
                    return [4 /*yield*/, noteModel_1.default.findById(noteID)];
                case 1:
                    note = _a.sent();
                    if (!note) {
                        return [2 /*return*/, res.status(404).json({ message: "Note not found" })];
                    }
                    likes = note.likes.length;
                    return [2 /*return*/, res.status(200).json(likes)];
            }
        });
    });
}
exports.getLikes = getLikes;
function getTrendingNotes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var notes, trendingNotes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, noteModel_1.default.find({ "createdAt": { $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000))) } }).populate('createdBy')];
                case 1:
                    notes = _a.sent();
                    trendingNotes = notes.sort(function (a, b) {
                        if (b.likes > a.likes)
                            return 1;
                        else
                            return -1;
                    });
                    res.status(200).send(trendingNotes);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getTrendingNotes = getTrendingNotes;
