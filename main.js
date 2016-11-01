const use = require('./methods/use');
const get = require('./methods/get');
const del = require('./methods/delete');

function requestLib (app) {
  // Overwrite native methods with wrapper functions.
  app.use = use(app);
  app.get = get(app);
  app.delete = del(app);

};

module.exports = requestLib;