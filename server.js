const express = require('express');
const app = express();
// const { v4: uuidv4 } = require('uuid');
// const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extends: false }));
app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
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
