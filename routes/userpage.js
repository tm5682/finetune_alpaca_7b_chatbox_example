var express = require('express');
var router = express.Router();

//we bring the controller for contactstabledata
//var fetchContactsData = require('../controllers/fetchContactsData');

//we destructure and bring ensureAuthenticated from auth file to protect our link
const { ensureAuthenticated } = require('../config/auth')

/* page with auth rule passed */
router.get('/', ensureAuthenticated,  function(req, res, next) {
  res.render('userpage', {page:'Userpage', menuId:'userpage'});
});



module.exports = router;
