const express = require('express');

const carsRouter = require('./data/carsRouter');

const server= express();

server.use(express.json())
server.use('/api/cars', carsRouter)

server.get('/', (req, res) => {
  res.status(200).json('Initial GET for my awesome car dealer API!')
})

module.exports = server;