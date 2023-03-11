const express = require('express');
const router = express.Router();
const concertsController = require('../controllers/concerts.controller');

router.get('/concerts/random', concertsController.getRandom);

router.get('/concerts', concertsController.getAll);

router.get('/concerts/:id', concertsController.getById);

router.post('/concerts', concertsController.add);

router.put('/concerts/:id', concertsController.edit);

router.delete('/concerts/:id', concertsController.remove);

module.exports = router;
