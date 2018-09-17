const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const session = require('express-session');
const config = require('./config/Config');
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
app.use(session({
  secret: config.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: false },
}));
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(config.DB, () => {
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
  console.log('error! auth failed');
}

router.get('/api/current_user', isLoggedIn, (req, res) => {
  if (req.user) {
    res.send({ current_user: req.user });
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.send();
});


router.get('/', (request, response) => {
  response.json({ message: 'API Initalized!' });
});

const port = process.env.PORT || 8081;
app.use('/', router);

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
