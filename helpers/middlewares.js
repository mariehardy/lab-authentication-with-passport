// Middleware to check user is logged in each route this is called
// const ensureLogin = require('connect-ensure-login');
// Best to just write this ourselves, cause this doesn't work with Flash::

// MAKE IT DRY !! (developpers dont like to repeat themselves)
// this is a middleware

let loggedInUser = (req, res, next) => {
    // req.user // passport makes this available 
    if (req.user) {
      next()
    } else {
      req.flash('error', 'You have to be logged in to view this page')
      req.flash('error', 'this is Message 2')
      res.redirect('/login?redirectBackTo=' + req.path)
    }
  }


  module.exports = { loggedInUser: loggedInUser }