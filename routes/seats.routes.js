const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const database = db.seats;

// get all seats
router.route('/seats').get((req, res) => {
  res.json(database);
});

// get seat by id
router.route('/seats/:id').get((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    res.json(database[index]);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

// add seats
router.route('/seats').post((req, res) => {
  database.push({
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  });

  res.json({ message: 'OK' });
});

// modify seat by id
router.route('/seats/:id').put((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    database[index].day = req.body.day || database[index].day;
    database[index].seat = req.body.seat || database[index].seat;
    database[index].client = req.body.client || database[index].client;
    database[index].email = req.body.email || database[index].email;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

// delete seat by id
router.route('/seats/:id').delete((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    database.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

module.exports = router;
