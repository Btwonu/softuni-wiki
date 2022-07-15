const { Router } = require('express');
const authService = require('../services/authService');

const router = Router();

const isGuest = require('../middleware/auth/isGuest');
const isAuthenticated = require('../middleware/auth/isAuthenticated');
const validateRegister = require('../middleware/validations/register');

router.get('/register', isGuest, (req, res) => {
  res.render('register');
});

router.post('/register', isGuest, validateRegister, (req, res, next) => {
  const { username, password, repeatPassword } = req.body;
  const validPassword = password === repeatPassword;

  authService
    .register({ username, password })
    .then((data) => {
      console.log('User registered:', data);
      res.redirect('/');
    })
    .catch(next);
});

router.get('/login', isGuest, (req, res) => {
  res.render('login');
});

router.post('/login', isGuest, (req, res, next) => {
  authService
    .login(req.body)
    .then((token) => {
      res.cookie('SESSION', token);
      res.redirect('/');
    })
    .catch(next);
});

router.get('/logout', isAuthenticated, (req, res) => {
  res.clearCookie('SESSION');
  res.redirect('/');
});

module.exports = router;
