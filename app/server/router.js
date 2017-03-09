const AuthController = require('./controllers/auth');
const express                  = require('express');
const passportService          = require('./config/passport');
const passport                 = require('passport');

const requireAuth  = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  const apiRoutes  = express.Router();
  const authRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthController.login);

// Set url for API group routes
  app.use('/api', apiRoutes);
}