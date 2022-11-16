const routes = require('express')();

const authMiddleware = require('../middlewares/auth');
const usersControllers = require('../controllers/UsersController');

routes.post('/', authMiddleware, usersControllers.create);
routes.get('/', authMiddleware, usersControllers.list);
routes.get('/:id', authMiddleware, usersControllers.search);
routes.put('/:id', authMiddleware, usersControllers.update);
routes.delete('/:id', authMiddleware, usersControllers.destroy);

module.exports = routes;