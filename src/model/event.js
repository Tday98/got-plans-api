import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Event = new Schema({
  eventDescription: String, default: "",
  eventName: String, default: "",
  dateTime: {type: Date, default: Date.now},
  userId: {type: ObjectId. ref: 'User'}
});

module.exports = mongoose.model('Event', Event);