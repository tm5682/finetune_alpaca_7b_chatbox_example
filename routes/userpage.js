var express = require('express');
var router = express.Router();

let User = require('../models/User');




//we destructure and bring ensureAuthenticated from auth file to protect our link
const { ensureAuthenticated } = require('../config/auth')

/* page with auth rule passed */
router.get('/', ensureAuthenticated, async function( req, res, next) {
  res.render('userpage', {title:'Userpage', menuId:'userpage'});
});






module.exports = router;