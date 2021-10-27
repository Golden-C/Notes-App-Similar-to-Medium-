import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const dotenv = require("dotenv").config()
import router from './routes/userRoutes';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
const flash = require('connect-flash');
const passportSetup = require('./config/passport-config')
require('./controller/user-Controller')(passport)
// const FileStore = require('session-file-store')(session)


const app = express();

//importing routes
const notesRoutes = require ('./routes/notes')
const baseRoutes = require ('./routes/base')
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index')



// run();

declare module "express" {
  interface Request {
      flash?: any,
      isAuthenticated?:any,
  }
}

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  // store: new FileStore,
  secret:process.env.SESSION_SECRET!,
  resave: true,
  saveUninitialized:true,
}))

app.get('/',(req,res)=>{
  res.status(200).send('welcome to notexd app')
})
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport) 

app.get("/emerie", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//Connect flash
app.use(flash())


//GLobal Vars
app.use((req:Request, res:Response, next:NextFunction)=>{
  res.locals.success_msg = req.flash('sucess_msg');
  res.locals.error_msg=req.flash('error_msg');
  next();
})



//Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session())

// app.use('/',baseRoutes);
app.use('/notes',notesRoutes);
app.use('/auth', authRouter);
app.use('/users', indexRouter);
app.use('/testing', router)



// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});



export default app
