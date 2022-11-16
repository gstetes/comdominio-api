const routes = require('express')();

const userRoutes = require('./users.routes');

routes.use('/users', userRoutes)

module.exports = routes;