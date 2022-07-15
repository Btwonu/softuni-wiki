const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/auth/auth');

module.exports = (app) => {
  const hbs = handlebars.create({
    extname: 'hbs',
    helpers: {
      whatis: function (param) {
        console.log('THIS IS:', param);
      },
      isSelected: function (currentValue, cubeValue) {
        return currentValue === cubeValue ? 'selected' : '';
      },
    },
  });

  app.engine('hbs', hbs.engine);

  app.set('view engine', 'hbs');

  app.use(express.static('public'));

  app.use(express.urlencoded({ extended: false }));

  app.use(cookieParser());

  app.use(auth());
};
