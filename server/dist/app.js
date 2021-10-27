"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv = require("dotenv").config();
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var passport_1 = __importDefault(require("passport"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var flash = require('connect-flash');
var passportSetup = require('./config/passport-config');
require('./controller/user-Controller')(passport_1.default);
// const FileStore = require('session-file-store')(session)
var app = (0, express_1.default)();
//importing routes
var notesRoutes = require('./routes/notes');
var baseRoutes = require('./routes/base');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
// view engine setup
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, express_session_1.default)({
    // store: new FileStore,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.get('/', function (req, res) {
    res.status(200).send('welcome to notexd app');
});
app.use((0, cookie_parser_1.default)(process.env.SESSION_SECRET));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
require('./config/passport')(passport_1.default);
app.get("/emerie", function (req, res) {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//Connect flash
app.use(flash());
//GLobal Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
//Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session())
// app.use('/',baseRoutes);
app.use('/notes', notesRoutes);
app.use('/auth', authRouter);
app.use('/users', indexRouter);
app.use('/testing', userRoutes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});
exports.default = app;
