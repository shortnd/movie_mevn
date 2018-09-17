const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'movieratingapplicationsecretkey';

const app = express();
const router = express.Router();
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

app.use(morgan('combined'));
app.use(bodyPaser.json());
app.use(cors());
app.use(passport.initialize());

// connect to mongodb
mongoose.connect('mongodb://localhost/movie_mevn', () => {
  console.log('Connection has been made');
})
  .catch((error) => {
    console.error('App starting error:', error.stack);
    process.exit(1);
  });

// Includes controller that has routes for each model
fs.readdirSync('controllers').forEach((file) => {
  if (file.substr(-3) === '.js') {
    // eslint-disable-next-line
    const route = require('./controllers/'+ file);
    route.controller(app);
  }
});
app.use(history());
// eslint-disable-next-line
app.use(serveStatic(__dirname + '/dist'));

router.get('/', (request, response) => {
  response.json({ message: 'API Initalized!' });
});

const port = process.env.PORT || 8081;
app.use('/', router);

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
