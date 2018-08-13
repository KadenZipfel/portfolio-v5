const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const keys = require('./config/keys');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

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

// Contact Post Route
app.post('/contact', (req, res) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: keys.google.user,
      pass: keys.google.pass
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Contact Form" <kaden.zipfel@hotmail.com>', // sender address
    to: 'kaden.zipfel@hotmail.com', // list of receivers
    subject: req.body.subject + ' - ' + req.body.email, // Subject line
    text: req.body.message, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent');
  });
  res.redirect('back');
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});