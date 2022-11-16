const routes = require('express')();

const authMiddleware = require('../middlewares/auth');
const rolesController = require('../controllers/RoleController');

routes.post('/', authMiddleware, rolesController.create);
routes.get('/', authMiddleware, rolesController.list);
routes.delete('/:id', authMiddleware, rolesController.destroy);
routes.put('/:id', authMiddleware, rolesController.update);

module.exports = routes;