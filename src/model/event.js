import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Event = new Schema({
  eventName: String, default: "",
  eventDescription: String, default: "",
  eventLocation: String, default: "",
  eventDate: {type: Date, default: Date.now},
  userId: {type: ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Event', Event);