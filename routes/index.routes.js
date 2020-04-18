const express = require('express');
const router = express.Router();



/* GET home page */
router.get('/', (req, res, next) => {

    // req.user // passport makes this available 
    res.render('index', { user: req.user });
  
  });

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




// here user needs to be logged in
router.get('/private-page', loggedInUser, (req, res, next) => {
    res.render('auth/private', { user: req.user });
  });
  



module.exports = router;
