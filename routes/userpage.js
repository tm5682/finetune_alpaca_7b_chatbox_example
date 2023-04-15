var express = require('express');
var router = express.Router();

let User = require('../models/User');

const workouts = [
  {
  name: "Full Body Workout",
  description: "A balanced full-body workout for strength and endurance.",
  image: "/images/workout_6.webp",
  details: [
      "3 sets of 10 push-ups",
      "3 sets of 10 squats",
      "3 sets of 10 lunges",
      "3 sets of 10 jumping jacks",
      "3 sets of 10 sit-ups"
  ]
  },
  {
  name: "Cardio Blast",
  description: "An intense cardio workout to burn calories and improve fitness.",
  image: "/images/workout_2.jpeg",
  details: [
      "5-minute warm-up jog",
      "20-minute high-intensity interval training (HIIT)",
      "10-minute cooldown walk"
  ]
  },
  {
  name: "Yoga for Flexibility",
  description: "A series of yoga poses to enhance flexibility and relaxation.",
  image: "/images/workout_1.webp",
  details: [
      "Sun salutation sequence",
      "Downward-facing dog",
      "Pigeon pose",
      "Seated forward bend",
      "Child's pose"
  ]
  }
];

const nutritions = [
  {
  name: "High Protein Diet",
  description: "A diet plan focused on consuming high-quality protein sources.",
  image: "/images/nutrition_3.jpg",
  details: [
      "Lean meats like chicken, turkey, and fish",
      "Eggs and egg whites",
      "Low-fat dairy products",
      "Legumes and beans",
      "Nuts and seeds"
  ]
  },
  {
  name: "Mediterranean Diet",
  description: "A healthy eating plan inspired by the traditional diet of Mediterranean countries.",
  image: "/images/nutrition_2.jpeg",
  details: [
      "Fresh fruits and vegetables",
      "Whole grains",
      "Olive oil",
      "Lean protein, especially fish",
      "Moderate amounts of dairy, red wine, and nuts"
  ]
  },
  {
  name: "Vegan Diet",
  description: "A plant-based diet that eliminates all animal products.",
  image: "/images/nutrition_1.jpeg",
  details: [
      "Fruits and vegetables",
      "Whole grains",
      "Legumes and beans",
      "Nuts and seeds",
      "Plant-based protein sources like tofu and tempeh"
  ]
  }
];


//we bring the controller for contactstabledata
//var fetchContactsData = require('../controllers/fetchContactsData');

//we destructure and bring ensureAuthenticated from auth file to protect our link
const { ensureAuthenticated } = require('../config/auth')

/* page with auth rule passed */
router.get('/', ensureAuthenticated,  async function( req, res, next) {
  const user = await User.findById(req.user._id);
  res.render('userpage', {title:'Userpage', menuId:'userpage', measurements: user.measurements, age: user.age, height: user.height, workouts: workouts, nutritions: nutritions,  userName: req.user ? req.user.username : 'Guest'});
});



router.get('/explore_program/workout/:id',   (req, res) => {
  const program = workouts[req.params.id];
  res.render('explore_program', { title:'explore_program',  menuId:'userpage', program });
});

router.get('/explore_program/nutrition/:id', (req, res) => {
  const program = nutritions[req.params.id];
  res.render('explore_program',  { title:'Workout Page',  menuId:'userpage', program });
});



module.exports = router;