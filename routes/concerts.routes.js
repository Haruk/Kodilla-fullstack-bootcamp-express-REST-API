const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const database = db.concerts;

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(database);
});

// get concert by id
router.route('/concerts/:id').get((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    res.json(database[index]);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

// add concert
router.route('/concerts').post((req, res) => {
  database.push({
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  });

  res.json({ message: 'OK' });
});

// modify concert by id
router.route('/concerts/:id').put((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    database[index].performer = req.body.performer || database[index].performer;
    database[index].genre = req.body.genre || database[index].genre;
    database[index].price = req.body.price || database[index].price;
    database[index].day = req.body.day || database[index].day;
    database[index].image = req.body.image || database[index].image;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

// delete concert by id
router.route('/concerts/:id').delete((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    database.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

module.exports = router;
