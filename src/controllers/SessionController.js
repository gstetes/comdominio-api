const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await connection('users')
    .select('*')
    .where('email', email)
    .first();

  if (!userExists) {
    return res.status(404)
      .json({
        error: 'User does not exists.',
      });
  };

  const passwordMatch = bcrypt.compare(password, userExists.password);

  if (passwordMatch) {
    const token = jwt.sign({
      id: userExists.id,
      username: userExists.name
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: 1000 * 60 * 10,
    });

    return res.status(200)
      .json({
        token: token,
      })
  } else {
    return res.status(400)
      .json({
        error: 'Invalid credentials.'
      });
  };
};

const refreshToken = async (req, res) => {
  const token = jwt.sign({}, process.env.JWT_SECRET_KEY, {
    expiresIn: 1000 * 60 * 60,
  });

  return res.status(200)
    .json({
      refreshToken: token,
    });
};

module.exports = {
  login,
  refreshToken
};