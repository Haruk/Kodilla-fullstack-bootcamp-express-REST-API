const express = require('express');
const app = express();
// const { v4: uuidv4 } = require('uuid');
// const db = require('./db') ;
const cors = require('cors');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extends: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

// mongoose.connect(
//   // 'mongodb://localhost:27017/NewWaveDB',
//  'mongodb+srv://haruka.lex:${process.env.DB_PASS}@clusterforfestival.ukdrmqm.mongodb.net/?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true,
//   }
// );

// if (NODE_ENV === 'test') {
//   dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
// } else {
//   dbUri =
//      'mongodb+srv://haruka.lex:${process.env.DB_PASS}@clusterforfestival.ukdrmqm.mongodb.net/?retryWrites=true&w=majority';
// }

if (NODE_ENV === 'production')
  dbUri =
    `mongodb+srv://haruka.lex:${process.env.DB_PASS}@kodilla-seatsapp.eao3ckp.mongodb.net/kodilla-seatsApp?retryWrites=true&w=majority`;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  // console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  // console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('new socket!', socket.id);
});

module.exports = server;