const Concert = require('../models/concerts.models');

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(rand);
    if (!concert) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(concert);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(concert);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const performer = await Concert.find({ performer: req.params.performer });
    if (performer.length === 0) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(performer);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const genre = await Concert.find({ genre: req.params.genre });
    if (genre.length === 0) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(genre);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const price = await Concert.find({
      price: { $gte: req.params.price_min, $lte: req.params.price_max },
    });
    if (price.length === 0) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(price);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const day = await Concert.find({ day: req.params.day });
    if (day.length === 0) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(day);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.add = async (req, res) => {
  try {
    const newConcert = new Concert({
      ...req.body,
    });
    await newConcert.save();
    res.json({ message: 'OK', newConcert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
      await concert.save();
      res.json({ message: 'OK', editedConcert: concert });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.remove = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', deletedConcert: concert });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
