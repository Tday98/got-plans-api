import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String, default: "",
  lastName: String, default: "",
  email: String, default: ""
});

module.exports = mongoose.model('User', User);