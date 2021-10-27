import { Profile } from "passport";
import {Use, DatabaseUserInterface} from '../interfaces/interface'
const passport = require('passport');
import mongoose from "mongoose";
import { objInt } from '../interfaces/interface';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../model/signupModel')
import User from '../model/signupModel';

interface newObjd extends mongoose.Model<objInt> {
    _id?: string
}
// passport.serializeUser((user,done))

passport.serializeUser((user:Use, done:Function)=>{
    done(null, user.id);
  });

  passport.deserializeUser( (id:string, done:Function)=> {
  User.findById(id).then((user:any)=>{
        done(null, user)
    })
  });

passport.use(
    new GoogleStrategy({
        clientID : process.env.CLIENT_ID_GOOGLE,
        clientSecret : process.env.SECRET,
        callbackURL:'/auth/google/redirect',
    },async(accessToken:string, refreshToken:string, profile:Profile, done:Function)=>{
        let previousUser = await User.findOne({googleId:profile.id})
         if(previousUser){

            done(null, previousUser)

        }else{
            let googleuser = {
                googleId : profile.id,
                lastName : profile.name!.familyName,
                firstName : profile.name!.givenName,
                email : profile.emails![0].value
            }
            let newuser = await User.create(googleuser)
            console.log(newuser);
            done(null, newuser)
        }



    })
)
