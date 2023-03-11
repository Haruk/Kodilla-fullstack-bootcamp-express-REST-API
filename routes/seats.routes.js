const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seats.controller');

router.get('/seats/random', seatsController.getRandom);

router.get('/seats', seatsController.getAll);

router.get('/seats/:id', seatsController.getById);

router.post('/seats', seatsController.add);

router.put('/seats/:id', seatsController.edit);

router.delete('/seats/:id', seatsController.remove);

module.exports = router;
