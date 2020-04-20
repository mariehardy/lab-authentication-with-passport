const express = require('express');
const router = express.Router();



/* GET home page */
router.get('/', (req, res, next) => {

    // req.user // passport makes this available 
    res.render('index', { user: req.user });
  
  });



module.exports = router;
