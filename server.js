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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

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

mongoose.connect(
  'mongodb://localhost:27017/NewWaveDB',

  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('new socket!', socket.id);
});

// app.get('/testimonials/random', (req, res) => {
//   const random = Math.floor(Math.random() * db.testimonials.length);
//   res.json(db.testimonials[random]);
// });

// app.get('/testimonials', (req, res) => {
//   res.json(db.testimonials);
// });

// app.get('/testimonials/:id', (req, res) => {
//   res.json(db.testimonials.filter((element) => element.id == req.params.id));
// });

// app.post('/testimonials', (req, res) => {
//   db.testimonials.push({
//     id: uuidv4(),
//     author: req.body.author,
//     text: req.body.text,
//   });

//   res.json({ message: 'OK' });
// });

// app.put('/testimonials/:id', (req, res) => {
//   db.testimonials.map((element) => {
//     if (element.id == req.params.id) {
//       element.author = req.body.author;
//       element.text = req.body.text;
//     } else {
//       return element;
//     }
//   });

//   res.json({ message: 'OK' });
// });

// app.delete('/testimonials/:id', (req, res) => {
//   const index = db.testimonials.findIndex(
//     (element) => element.id == req.params.id
//   );
//   db.testimonials.splice(index, 1);

//   res.json({ message: 'OK' });
// });
