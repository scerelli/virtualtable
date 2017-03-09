const jwt    = require('jsonwebtoken');
const crypto = require('crypto');
const User   = require('../models/user');
const config = require('../config/main');

function generateToken(user, secret) {
  return jwt.sign(user, secret, {
    expiresIn: 10080 // in seconds
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
    username: request.username
  };
}

export const login = (req, res, next) => {

  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo, config.secret),
    user: userInfo
  });
}

export const register = (req, res, next) => {
  // Check for registration errors
  const { username, email, password } = req.body;

  // Return error if no email provided
  if (!username) {
    return res.status(422).send({ error: 'You must enter a user name to proceed.'});
  }

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.find({$or:[ {username}, {email}]}, (err, existingUser) => {
      if (err) {
        return next(err);
      }

      // If user is not unique, return error
      if (existingUser.length) {
        return res.status(422).send({ error: 'That email address or username is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        username,
        email,
        password
      });

      user.save(function(err, user) {
        if (err) {
          return next(err);
        }

        let userInfo = setUserInfo(user);
        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo, config.secret),
          user: userInfo
        });
      });
  });
}
