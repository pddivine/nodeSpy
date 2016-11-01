function override_delete (app) {
  return function (path, ...args) {
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
        app._delete(path, [before, middleware, after]);
    });
  }
}
module.exports = override_delete;