require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const noteRouter = require('./note/note-router')
const folderRouter = require('./folder/folder-router')

const jsonParser = express.json()
const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use('/api/note', noteRouter)
// app.use('/api/folder', folderRouter)

// app.get("/", (req, res) => {
//   res.send("What up from noteful-server");
// });

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;