require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const NoteService = require("./note/note-service");
const FolderService = require("./folder/folder-service");
const noteRouter = require("./note/note-router");
const folderRouter = require("./folder/folder-router");

const jsonParser = express.json();
const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use('/api/note', noteRouter)
// app.use('/api/folder', folderRouter)

app.get("/notes", (req, res, next) => {
  NoteService.getAllNotes(req.app.get("db"))
    .then((notes) => {
      res.json(notes);
    })
    .catch(next);
});

app.get("/notes/:note_id", jsonParser, (req, res, next) => {
  const id = req.params.note_id;

  NoteService.getById(req.app.get("db"), id)
    .then((note) => {
      res.status(201).json(note);
    })
    .catch(next);
});

app.post("/notes", jsonParser, (req, res, next) => {
  const { note_name, content, folder_id } = req.body;
  const newNote = { note_name, content, folder_id };

  NoteService.insertNote(req.app.get("db"), newNote)
    .then((note) => {
      res.status(201).json(newNote);
    })
    .catch(next);
});

app.delete("/notes/:note_id", jsonParser, (req, res, next) => {
  const id = req.params.note_id;

  NoteService.deleteNote(req.app.get("db"), id)
  .then(() => {
    res.status(204).end()
  })
})

app.get("/folders", (req, res, next) => {
  FolderService.getAllFolders(req.app.get("db"))
    .then((folders) => {
      res.json(folders);
    })
    .catch(next);
});

app.delete("/folders/:folder_id", jsonParser, (req, res, next) => {
  const id = req.params.folder_id;

  FolderService.deleteFolder(req.app.get('db'), id)
  .then(() => {
    res.status(204).end()
  })
})

app.get("/folders/:folder_id", jsonParser, (req, res, next) => {
  const id = req.params.folder_id;

  FolderService.getById(req.app.get("db"), id)
    .then((folder) => {
      res.status(201).json(folder);
    })
    .catch(next);
});

app.post("/folders", jsonParser, (req, res, next) => {
  const { folder_name } = req.body;
  const newFolder = { folder_name };
  FolderService.insertFolder(req.app.get("db"), newFolder)
    .then((folder) => {
      res.status(201).json(newFolder);
    })
    .catch(next);
});

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
