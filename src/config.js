module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  // DATABASE_URL: 'noteful-server:us-west2:noteful-database',
  DATABASE_URL: process.env.DATABASE_URL,
};
