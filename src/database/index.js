const knex = require('knex');
const securePassword = require('bookshelf-secure-password');
const database = require('../knexfile');
const knexDb = knex(database.development);
const bookshelf = require('bookshelf');
const db = bookshelf(knexDb);
db.plugin(securePassword);

module.exports = db;
