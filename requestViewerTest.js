const express = require('express');
const app = express();
const requestSpy = require('./main.js')(app);

app.use('/useRoute', (req, res, next) => {
  console.log('Use route called');
  next();
}, (req, res, next) => {
  console.log(2);
  res.send('Finish!');
})

app.get('/getRoute', (req, res, next) => {
  console.log('Get route called');
  next();
}, (req, res, next) => {
  console.log(2);
  res.send('Finish!');
});

app.delete('/deleteRoute', (req, res, next) => {
  console.log('Delete route called');
  next();
}, (req, res, next) => {
  console.log(2);
  res.send('Finish!');
});

// Establish server
app.listen(3000, () => {
  console.log('Listening on 3000.');
});