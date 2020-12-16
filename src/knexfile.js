const { DATABASE_URL } = require('./config');

const db = {
  development: {
    client: 'pg',
    connection: DATABASE_URL,
  },
};

module.exports = db;