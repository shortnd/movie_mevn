const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyPaser.json());
app.use(cors());

// connect to mongodb
mongoose.connect('mongodb://localhost/movie_mevn', function() {
  console.log('Connection has been made');
})
.catch(error => {
  console.error('App starting error:', error.stack);
  process.exit(1);
});

router.get('/', function(request, response) {
  response.json({ message: 'API Initalized!' });
});

const port = process.env.PORT || 8081;
app.use('/', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});