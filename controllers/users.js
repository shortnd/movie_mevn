const User = require('../models/User');

module.exports.controller = (app) => {
  // Get all users
  // app.get('/users', (req, res) => {
  //   User.find({}, 'name email', (error, users) => {
  //     if (error) { console.log(error); }
  //     res.send(users);
  //   });
  // });
  // register a user
  app.post('/users/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
      name,
      email,
      password,
    });
    User.createUser(newUser, (error, user) => {
      if (error) { console.log(error); }
      res.send({ user });
    });
  });
};
