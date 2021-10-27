import { Profile, Authenticator } from "passport";
import express from 'express'
const LocalStrategy = require('passport-local').Strategy
import mongoose from 'mongoose'
// const Users = require("../model/signupModel")
import Users from '../model/signupModel';
const bcrypt = require('bcrypt')

export interface DatabaseUserInterface {
    email : string;
    password: string;
    id: string;
  }
interface User{
    id?: string
}
module.exports = function(passport:Authenticator) {
    passport.use (
        new LocalStrategy({usernameField: "email" },async(email:string,password:string,done:Function)=>{
            //Match User
            try{
               let user =  await Users.findOne({email:email})
                
               if(!user){
                   return done(null, false, { message: 'Email is not in use'});
               }else{
                    let check = await bcrypt.compare( password, user.password)
                if(!check){
                    console.log('vb ')
                    return done(null, false, { message: 'Password Incorrect'});  
                }else{
                    return done(null, user)
                }
            }
            }catch(err){
                console.log(err); 
                return done(null, false, { message: err});  
            }
        })
    );
    passport.serializeUser((user:User, done)=>{
        done(null, user.id);
      });

      passport.deserializeUser((id, done)=> {
        Users.findById(id, function(err:Error, user:User) {
          done(err, user);
        });
      });
}