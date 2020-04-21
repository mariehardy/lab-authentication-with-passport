const express = require('express');
// const session = require('express-session');
const router = express.Router();

// Require Model
const User = require('../models/User.model')

// Add bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// Add passport
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const loggedInUser = require('../helpers/middlewares').loggedInUser






// ROUTES

// GET SIGNUP
router.get("/signup", (req, res, next) => {
  res.render('auth/signup', { errorArr: req.flash('message')})
})

// POST SIGNUP
router.post("/signup", (req,res, next) => {
  
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(req.body.password, salt);

  let user = new User({ username: req.body.username, password: hashPass })
  user.save().then(() => {
    console.log('user was created successfully')
    req.login(user, () => { res.redirect('/') })
    // res.redirect("/login")
  })
})


// THIS IS HOW TO DIRECTLY LOG USER IN AFTER SIGN UP:
// let user = new User({ username: req.body.username, password: hashPass })
//   user.save().then(() => {
//     req.login(user, () => { res.redirect('/') })
//   })

// GET LOGIN
router.get("/login", (req, res, next) => {
    //console.log(req.flash('error')) // **** DO NOT console log cause the error message won't display a second time!!
    res.render('auth/login', { errorArr: req.flash('error') })
})

// POST LOGIN
router.post("/login", passport.authenticate('local', {
  successRedirect: '/private-page',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
})
);

// GET LOGIN WITH SLACK - PASSPORT STRATEGY
router.get("/auth/slack", passport.authenticate("slack"));
router.get(
  "/auth/slack/callback",
  passport.authenticate("slack", {
    successRedirect: "/private-page",
    failureRedirect: "/" // here you would navigate to the classic login page
  })
);



router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});





// rendering a page that we should define in the /views/private.hbs path
// *** ALWAYS place this route AFTER the other routes

// router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render('auth/private', { user: req.user });
// });


// here user needs to be logged in
router.get('/private-page', loggedInUser, (req, res, next) => {
  res.render('auth/private', { user: req.user });
});



module.exports = router;
