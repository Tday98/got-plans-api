import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import socket from 'socket.io';
import Event from './model/event';

const LocalStrategy  = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);
let io = socket(app.server);

//middleware
//parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api routes v1
app.use('/v1', routes);

// Base URL test endpoint to see if API is running
app.get('/', (req, res) => {
  res.json({ message: 'got-plans? API is ALIVE!' })
});

/* Making the Events */
io.on('connection', function(client) {
  console.log('a user is connected');
  // Listening for the creation of a new event.
  client.on('newEvent', function(eventName, eventDescription, eventLocation, eventDate, userId) {
    // Create Event
    let newEvent = new Event({
      eventName: eventName,
      eventDescription: eventDescription,
      eventLocation: eventLocation,
      eventDate: eventDate,
      userId: userId
    });
    newEvent.save(function(err, event) {
      console.log('new event created');
      io.emit("newEvent", event.eventName, event.eventDescription, event.eventLocation, event.eventDate, event.userId);
    });
  });
});

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

/* End of Mkaing Events code */

module.exports = {
  app,
  io
}
