const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({ origin: '*' }));
server.use('/v1', routes);

server.listen(3333, () => {
  console.log('Server is running 🚀');
});