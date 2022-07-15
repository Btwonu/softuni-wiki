const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
  // check if user exists in db
  const { username, password } = userData;

  // check if user exists in db
  let userFound = await User.findOne({
    username: username.toLowerCase(),
  }).lean();

  if (userFound) throw { message: 'Username is already registered.' };

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  const user = new User({ username: username.toLowerCase(), password: hash });

  return user.save();
};

const login = async (userData) => {
  const { username, password } = userData;

  // check if user exists in db
  let userFound = await User.findOne({
    username: username.toLowerCase(),
  }).lean();

  if (!userFound) throw { message: 'No such user.' };

  // compare passwords
  const match = await bcrypt.compare(password, userFound.password);
  if (!match) throw { message: 'Invalid password.' };

  // generate jwt
  const token = jwt.sign({ id: userFound._id, username }, SECRET);

  // return jwt
  return token;
};

const callErrorFn = () => {
  throw { message: 'This is a test error', status: 500 };
};

module.exports = {
  register,
  login,
  callErrorFn,
};
