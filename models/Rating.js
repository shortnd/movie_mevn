const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RatingSchema = new Schema({
  movie_id: String,
  user_id: String,
  rating: Number,
});

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;
