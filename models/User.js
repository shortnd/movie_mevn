const mongoose = require('mongoose');
const bycrptjs = require('bcryptjs');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.createUser = (newUser, callback) => {
  bycrptjs.genSalt(10, (err, salt) => {
    bycrptjs.hash(newUser.password, salt, (error, hash) => {
      // Store the hashed password
      const newUserResource = newUser;
      newUserResource.password = hash;
      newUserResource.save(callback);
    });
  });
};
