const routes = require('express')();

const userRoutes = require('./users.routes');
const sessionRoutes = require('./session.routes');
const rolesRoutes = require('./roles.routes');

routes.use('/users', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/roles', rolesRoutes);

module.exports = routes;