const express = require('express');
const router = express.Router();
// const db = require('../db');
// const { v4: uuidv4 } = require('uuid');
// const Testimonial = require('../models/testimonials.models');
const testimonialsController = require('../controllers/testimonials.controller');

// const database = db.testimonials;

// get random testimonial
// router.route('/testimonials/random').get((req, res) => {
//   const random = Math.floor(Math.random() * database.length);
//   res.json(database[random]);
// });

router.get('/testimonials/random', testimonialsController.getRandom);

// get all testimonials
// router.route('/testimonials').get((req, res) => {
//   res.json(database);
// });

router.get('/testimonials', testimonialsController.getAll);

// get testimonial by id
// router.route('/testimonials/:id').get((req, res) => {
//   const index = database.findIndex((element) => element.id == req.params.id);

//   if (index != -1) {
//     res.json(database[index]);
//   } else {
//     res.status(404).json({ message: 'Not found...' });
//   }
// });

router.get('/testimonials/:id', testimonialsController.getById);

// add testimonial
// router.route('/testimonials').post((req, res) => {
//   database.push({
//     id: uuidv4(),
//     author: req.body.author,
//     text: req.body.text,
//   });

//   res.json({ message: 'OK' });
// });

router.post('/testimonials', testimonialsController.add);

// modify testimonial by id
// router.route('/testimonials/:id').put((req, res) => {
//   const index = database.findIndex((element) => element.id == req.params.id);

//   if (index != -1) {
//     database[index] = {
//       ...database[index],
//       ...req.body,
//     };
//     res.json({ message: 'OK' });
//   } else {
//     res.status(404).json({ message: 'Not found...' });
//   }
// });

router.put('/testimonials/:id', testimonialsController.edit);

// delete testimonial by id
// router.route('/testimonials/:id').delete((req, res) => {
//   const index = database.findIndex((element) => element.id == req.params.id);

//   if (index != -1) {
//     database.splice(index, 1);
//     res.json({ message: 'OK' });
//   } else {
//     res.status(404).json({ message: 'Not found...' });
//   }
// });

router.delete('/testimonials/:id', testimonialsController.remove);

module.exports = router;
