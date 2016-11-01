const use = require('./methods/use');
const get = require('./methods/get');
const del = require('./methods/delete');

function requestLib (app) {
  // Save native methods from express app.
  app._use = app.use;
  app._get = app.get;
  app._delete = app.delete;

  // Overwrite native methods with wrapper functions.
  app.use = use(app);
  app.get = get(app);
  app.delete = del(app);

};

module.exports = requestLib;