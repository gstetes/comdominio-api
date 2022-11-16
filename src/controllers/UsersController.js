const connection = require('../database/connection');

const create = async (req, res) => {
  connection('users').insert({
    name: 'Guilherme',
    email: 'gstetes@gmail.com',
    password: '123'
  })
    .then(user => res.json({ user }))
    .catch(error => res.json({ error }))
};

module.exports = {
  create,
}