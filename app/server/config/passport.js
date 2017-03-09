// Importing Passport, strategies, and config
import passport from 'passport';
import User from '../models/user';
import config from './main';
import { Strategy, ExtractJwt } from 'passport-jwt';
import passportLocal from 'passport-local';

// Setting up local login strategy
const localLogin = new passportLocal({}, (username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if(err) {
      return done(err);
    }

    if(!user) {
      return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) {
        return done(null, false, { error: "Your login details could not be verified. Please try again." });
      }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  console.log(payload)
  User.findById(payload._id, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

