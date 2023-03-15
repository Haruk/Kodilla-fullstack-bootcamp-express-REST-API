const express = require('express');
const router = express.Router();
const concertsController = require('../controllers/concerts.controller');

router.get('/concerts/random', concertsController.getRandom);

router.get('/concerts', concertsController.getAll);

router.get('/concerts/:id', concertsController.getById);

router.get('/concerts/performer/:performer', concertsController.getByPerformer);

router.get('/concerts/genre/:genre', concertsController.getByGenre);

router.get(
  '/concerts/price/:price_min/:price_max',
  concertsController.getByPrice
);

router.get('/concerts/day/:day', concertsController.getByDay);

router.post('/concerts', concertsController.add);

router.put('/concerts/:id', concertsController.edit);

router.delete('/concerts/:id', concertsController.remove);

module.exports = router;
