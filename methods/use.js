function override_use (app) {
  return function (...args) {
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
}

module.exports = override_use;