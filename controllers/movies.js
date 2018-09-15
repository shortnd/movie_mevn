const MovieSchema = require('../models/Movie');
const Rating = require('../models/Rating');

module.exports.controller = (app) => {
  app.get('/movies', (req, res) => {
    MovieSchema.find({}, 'name description release_year movie_length genre', (error, movies) => {
      if (error) { console.log(error); }
      res.send({
        movies,
      });
    });
  });
  // Get a single movie
  app.get('/movies/:id', (req, res) => {
    MovieSchema.findById(req.params.id, 'name description release_year movie_length genre', (error, movie) => {
      if (error) { console.error(error); }
      res.send(movie);
    });
  });

  // rate a movie
  app.post('/movies/rate/:id', (req, res) => {
    const rating = new Rating({
      movie_id: req.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate,
    });

    rating.save((error, rating) => {
      if (error) { console.log(error); }
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate,
      });
    });
  });
  // add a new movie
  app.post('/movies/add', (request, response) => {
    const newMovie = new MovieSchema({
      name: request.body.name,
      description: request.body.description,
      release_year: request.body.release_year,
      movie_length: request.body.movie_length,
      genre: request.body.genre,
    });

    newMovie.save((error, movie) => {
      // eslint-disable-next-line
      if (error) { console.log(error); }
      response.send(movie);
    });
  });
};
