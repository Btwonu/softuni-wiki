module.exports = (req, res, next) => {
  const emailPattern = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const { username, password, repeatPassword } = req.body;
  const validPassword = password === repeatPassword;

  console.log({ username, password, repeatPassword });
  console.log({ validPassword });
  if (!username || username.length < 3) {
    console.log('username short');
    return res.render('register', {
      error: {
        message: 'Your username should be at least 3 characters long.',
      },
    });
  }

  if (!validPassword)
    return res.render('register', {
      error: {
        message: 'Both passwords should be the same...',
      },
    });

  next();
};
