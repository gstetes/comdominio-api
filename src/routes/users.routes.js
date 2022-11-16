const routes = require('express')();

const usersControllers = require('../controllers/UsersController');

routes.post('/create', usersControllers.create);

module.exports = routes;