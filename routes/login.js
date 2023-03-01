var express = require('express');
var router = express.Router();

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {page:'Login', menuId:'login'});
});


// we are stating what to do when login post 
//from passport authenticate documentation calling local as strategy, with additional parameters. 
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
});



module.exports = router;
