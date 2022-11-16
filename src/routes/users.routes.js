const routes = require('express')();

const usersControllers = require('../controllers/UsersController');

routes.post('/', usersControllers.create);
routes.get('/', usersControllers.list);
routes.get('/:id', usersControllers.search);
routes.put('/:id', usersControllers.update);
routes.delete('/:id', usersControllers.destroy);

module.exports = routes;