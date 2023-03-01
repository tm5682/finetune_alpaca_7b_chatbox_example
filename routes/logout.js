var express = require('express');
var router = express.Router();

var passport = require('passport');

// we are handling logout route through here 
router.get('/', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
  });
  
  
module.exports = router;
  