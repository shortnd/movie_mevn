const MovieSchema = require('../models/Movie');

module.exports.controller = (app) => {
  // add a new movie
  app.post('/movies', (request, response) => {
    const newMovie = new MovieSchema({
      name: request.body.name,
      description: request.body.description,
      release_year: request.body.release_year,
      genre: request.body.genre,
    });

    newMovie.save((error, movie) => {
      if (error) { console.log(error); }
      response.send(movie);
    });
  });
};
