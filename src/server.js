const knex = require('knex');
const app = require('./app');
const { PORT } = require('./config');
const knexDb = require('./knexfile');
const db = knex(knexDb.development);

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
