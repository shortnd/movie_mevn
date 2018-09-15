const MovieSchema = require('../models/Movie');

module.exports.controller = (app) => {
  app.get('/movies', (req, res) => {
    MovieSchema.find({}, 'name description release_year movie_length genre', (error, movies) => {
      if (error) { console.log(error); }
      res.send({
        movies,
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
