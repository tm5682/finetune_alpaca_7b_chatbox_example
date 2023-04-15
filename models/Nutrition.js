const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  details: [
    {
      type: String,
      required: true
    }
  ]
});



const Nutrition = mongoose.model('Nutrition', NutritionSchema);

module.exports = Nutrition;