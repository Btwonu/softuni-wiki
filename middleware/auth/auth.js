const { COOKIE_NAME, SECRET } = require('../../config/config');
const jwt = require('jsonwebtoken');

module.exports = () => {
  return (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];

    if (token) {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          res.clearCookie(COOKIE_NAME);
        } else {
          console.log('decoded token:', decoded);
          req.user = decoded;
          res.locals.user = decoded;
          res.locals.isAuthenticated = true;
        }
      });
    }

    next();
  };
};
