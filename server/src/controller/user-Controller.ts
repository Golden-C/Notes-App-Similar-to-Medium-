import passport from 'passport';
import { Strategy as FacebookStrategy, Profile } from 'passport-facebook';
import {Use, DatabaseUserInterface} from '../interfaces/interface'
// const  strategy = require('passport-facebook')

import notesUsers from '../model/signupModel';

// const FacebookStrategy = strategy.Strategy;

export = (passport: passport.Authenticator) => {
  passport.serializeUser(function (user: Use, done: Function) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id:string, done:Function) {
    notesUsers.findById(id, function(user:DatabaseUserInterface) {
      done(null, user);
    });
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string,
        callbackURL: process.env.CALLBACK_URL as string,
        profileFields: ['email', 'name'],
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done,
      ) {
        const { email, first_name, last_name, id } = profile._json; //password
        const userData = {
          email,
          firstName: first_name,
          lastName: last_name,
          facebookId: id
        };

        notesUsers.findOne({ email }, (err: any, user: any) => {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          }
          if (!user) {
            new notesUsers(userData).save();
            // console.log(userData);
            return done(null, userData);
          }
        });
      },
    ),
  );
};



