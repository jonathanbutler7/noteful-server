require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const { DATABASE_URL } = process.env;
const app = express();
const noteRouter = require('./note/note-router');
const folderRouter = require('./folder/folder-router');
const loginRouter = require('./login/login-router');

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use('/api/notes', noteRouter);
app.use('/api/folders', folderRouter);
app.use('/api/login', loginRouter);

app.get("/", (req, res) => {
  res.send("Hello, boilerplate!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: error.message, url: DATABASE_URL } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
