const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
  weight: Number,
  bodyFatPercentage: Number,
  date: Date,
});

const SuggestionSchema = new mongoose.Schema({
  suggestion: String,
  date: Date,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  height: Number,
  age: Number,
  measurements: [MeasurementSchema],
  suggestions: [SuggestionSchema],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
