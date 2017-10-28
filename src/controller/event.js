import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Event from '../model/event';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // '/v1/event/add' - Create
  api.post('/add', authenticate, (req, res) => {
    let newEvent = new Event();
    newEvent.eventDescription = req.body.eventDescription;
    newEvent.eventName = req.body.eventName;
    newEvent.dateTime = req.body.dateTime;
    newEvent.userId = req.body.userId;


    newEvent.save(err => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Event saved successfully' })
    });
  });

  // '/v1/message/:id' - Update
  api.put('/:id', authenticate, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      

      event.save(err => {
        if (err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Event updated' });
      });
    });
  });

  // '/v1/message/byChannel/:channelId'
  api.get('/byEvent/:userId', authenticate, (req, res) => {
    Message
      .find({ 'userId' : req.params.userId }, (err, messages) => {
        if(err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json(messages);
      });
  });

  // '/vq/message/:id' -Delete
  api.delete('/:id', authenticate, (req, res) => {
    Event.remove({
      _id: req.params.id
    }, (err, event) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Event Successfully Removed'});
    });
  });

  // '/v1/message/' - Delete all
  api.delete('/', authenticate, (req, res) => {
    Event.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Users All Removed'});
    });
  });

  return api;
}
