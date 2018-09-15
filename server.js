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
app.use(morgan('combined'));
app.use(bodyPaser.json());
app.use(cors());
app.use(passport.initialize());

// connect to mongodb
mongoose.connect('mongodb://localhost/movie_mevn', function() {
  console.log('Connection has been made');
})
.catch(error => {
  console.error('App starting error:', error.stack);
  process.exit(1);
});

// Includes controller that has routes for each model
fs.readdirSync('controllers').forEach(function (file) {
  if (file.substr(-3) == '.js') {
    const route = require('./controllers/' + file)
    route.controller(app)
  }
})

router.get('/', function(request, response) {
  response.json({ message: 'API Initalized!' });
});

const port = process.env.PORT || 8081;
app.use('/', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});