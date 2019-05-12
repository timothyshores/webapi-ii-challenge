const express = require('express');

const router = require('./router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
    <h2>Web API II Challenge</h>
  `);
});

server.use('/api/posts', router);

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = server;