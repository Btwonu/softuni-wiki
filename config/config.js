module.exports = {
  port: process.env.PORT || 3000,
  SALT_ROUNDS: 9,
  SECRET: 'verysecret',
  COOKIE_NAME: 'SESSION',
  DB: {
    uri: 'mongodb://localhost:27017/test',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
};
