const db = require('./dbConfig');

module.exports = {
  get,
  insert
}

function get() {
  return db('cars');
}

function insert() {
  return db('cars')
    .insert()
}