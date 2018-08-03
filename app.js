const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// ======
// ROUTES
// ======

// Index Route
app.get('/', (req, res) => {
  res.render('index');
});

// Portfolio Route
app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

// Contact Route
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});