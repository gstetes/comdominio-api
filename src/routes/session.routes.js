const routes = require('express')();

const sessionController = require('../controllers/SessionController');

routes.post('/login', sessionController.login);
routes.post('/refresh', sessionController.refreshToken);

module.exports = routes;