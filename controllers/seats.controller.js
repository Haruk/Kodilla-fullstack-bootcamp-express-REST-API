const Seat = require('../models/seats.models');

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if (!seat) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(seat);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(seat);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.add = async (req, res) => {
  try {
    const newSeat = new Seat({
      ...req.body,
    });
    await newSeat.save();
    res.json({ message: 'OK', newSeat });
    req.io.emit('seatsUpdated', await Seat.find());
    // req.io.emit('seatsUpdated', newSeat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const editedSeat = await Seat.findById(req.params.id);
    if (editedSeat) {
      editedSeat.day = day ?? editedSeat.day;
      editedSeat.seat = seat ?? editedSeat.seat;
      editedSeat.client = client ?? editedSeat.client;
      editedSeat.email = email ?? editedSeat.email;
      await editedSeat.save();
      // Seat.findOneAndUpdate
      res.json({ message: 'OK', editedSeat });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.remove = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', deletedSeat: seat });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
