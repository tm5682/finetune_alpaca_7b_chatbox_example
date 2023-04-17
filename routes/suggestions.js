// routes/suggestions.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('suggestions', { title: 'New Suggestion', menuId:'suggestions', userName: req.user.name });
});

// routes/suggestions.js (updated POST route)

router.post('/', ensureAuthenticated, async (req, res) => {
    try {
      const { suggestion, date } = req.body;
      const suggestedDate = new Date(date);
  
      // Update the user's suggestions
      const user = await User.findById(req.user._id);
  
      user.suggestions.push({
        date: suggestedDate,
        suggestion: suggestion,
      });
  
      await user.save();
  
      req.flash('success_msg', 'Suggestion added successfully');
      res.redirect('/userpage');
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Error adding suggestion');
      res.redirect('/suggestions');
    }
  
  });
  

module.exports = router;
