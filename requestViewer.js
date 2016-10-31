const fs = require('fs');
const express = require('express');
const app = express();
const routeControllers = require('./routes/controllers');
const bodyParser = require('body-parser');
// var birds = require('./birds');

// Serve static
app.use(express.static(__dirname + '/public'));

// Save ref to original .use, .get
app._use = app.use;
app._get = app.get;

// Define override .use
function override_use (...args) {
  let path;
  if ( typeof args[0] === 'string' ) {
    path = args[0];
  }
  function before (req, res, next) {
    // Define before logic here
    console.log('Before req.body', req.body);
    next();
  }
  function after (req, res, next) {
    // Define after logic here
    console.log('After req.body', req.body);
    next();
  }

  args.forEach((middleware, index) => {
    if (index === 0 && path) {
      return null;
    } else {
      if (path) {
        app._use(path, [before, middleware, after]);
      } else {
        app._use([before, middleware, after]);
      }
    }
  });
}

// Define override .get
function override_get (path, ...args) {
  function before (req, res, next) {
    // Define before logic here
    console.log('Before req.body', req.body);
    next();
  }
  function after (req, res, next) {
    // Define after logic here
    console.log('After req.body', req.body);
    next();
  }
  args.forEach((middleware, index) => {
    app._get(path, [before, middleware, after]);
  });
}

app.use = override_use;
app.get = override_get;
app.get('/appUseTest', bodyParser(), bodyParser());

app.get('/home', (req, res, next) => {
  console.log(1);
  next();
}, (req, res, next) => {
  console.log(2);
  res.send('Finish!');
})

// app.use('/birds', birds);

app.get('/appUseTest', (req, res) => {
  res.send('Done');
});

// Establish server
app.listen(3000, () => {
  console.log('Be sure to set credentials in config/default.json5 \nGo to http://localhost:3000 to test.');
});