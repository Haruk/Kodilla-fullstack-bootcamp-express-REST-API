const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const database = db.testimonials;

// get random testimonial
router.route('/testimonials/random').get((req, res) => {
  const random = Math.floor(Math.random() * database.length);
  res.json(database[random]);
});

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(database);
});

// get testimonial by id
router.route('/testimonials/:id').get((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    res.json(database[index]);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

// add testimonial
router.route('/testimonials').post((req, res) => {
  database.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });

  res.json({ message: 'OK' });
});

// modify testimonial by id
router.route('/testimonials/:id').put((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    database[index].author = req.body.author || database[index].author;
    database[index].text = req.body.text || database[index].text;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

// delete testimonial by id
router.route('/testimonials/:id').delete((req, res) => {
  const index = database.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    database.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

module.exports = router;
