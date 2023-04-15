// routes/measurements.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('measurements', { title: 'New Measurements', menuId:'userpage', userName: req.user.name });
});


router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    const { weight, height, age, bodyFatPercentage } = req.body;
    const currentDate = new Date();

    // Update the user's measurements
    const user = await User.findById(req.user._id);

    user.measurements.push({
      date: currentDate,
      weight: weight,
      bodyFatPercentage: bodyFatPercentage,
    });

    user.height = height;
    user.age = age;
    await user.save();

    req.flash('success_msg', 'Measurement added successfully');
    res.redirect('/userpage');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error adding measurement');
    res.redirect('/measurements');
  }

});

module.exports = router;
