const connection = require('../database/connection');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyExists =
    await connection('users')
      .select('*')
      .where('email', email)
      .first();

  if (!!userAlreadyExists) {
    return res.status(400)
      .json({
        error: 'User with this email already exists',
      });
  };

  const user = {
    name,
    email,
    password: await bcrypt.hash(password, 16),
  };

  try {
    await connection('users')
      .insert(user);
  } catch (error) {
    return res.status(500).json({ error: err });
  };

  return res.status(200).json();
};

const list = async (req, res) => {
  const users = await connection(`users`).select(`*`);

  return res.status(200).json(users);
};

const search = async (req, res) => {
  const { id } = req.params;

  const user = await connection('users')
    .select('*')
    .where('id', id)
    .first();

  if (!!user) {
    delete user.password;

    return res.status(200)
      .json(user);
  } else {
    return res.status(404)
      .json({
        error: 'User not found',
      });
  };
};

const update = async (req, res) => {
  const { id } = req.params;

  const userExists =
    await connection('users')
      .select('*')
      .where('id', id)
      .first();

  if (!userExists) {
    return res.status(404)
      .json({
        error: 'User does not exists.'
      });
  };

  if (!!req.password) {
    req.password = await bcrypt.hash(req.password, 16);
  };

  const newUserData = {
    id,
    ...req.body,
  };

  try {
    await connection('users')
      .select('*')
      .where('id', id)
      .first()
      .update(newUserData);

    return res.status(200)
      .json();

  } catch (error) {
    return res.status(500)
      .json({ error })
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const userExists = await connection('users')
    .select('*')
    .where('id', id)
    .first();

  if (!userExists) {
    return res.status(404)
      .json({
        error: 'User does not exists.'
      });
  };

  try {
    await connection('users')
      .select('*')
      .where('id', id)
      .first()
      .delete();

    return res.status(200)
      .json();
  } catch (error) {
    return res.status(500)
      .json({ error })
  }
};

module.exports = {
  create,
  list,
  search,
  update,
  destroy,
}