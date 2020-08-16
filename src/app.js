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
const path = require("path");

const jsonParser = express.json();
const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use("/api/notes", noteRouter);
app.use('/api/folders', folderRouter)



app.get("/folders", (req, res, next) => {
  FolderService.getAllFolders(req.app.get("db"))
    .then((folders) => {
      res.json(folders);
    })
    .catch(next);
});

app.delete("/folders/:folder_id", jsonParser, (req, res, next) => {
  const id = req.params.folder_id;

  FolderService.deleteFolder(req.app.get("db"), id).then(() => {
    res.status(204).end();
  });
});

app.patch("/folders/:folder_id", jsonParser, (req, res, next) => {
  const id = req.params.folder_id;
  const { folder_name } = req.body;
  const folderToUpdate = { folder_name };

  const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length;

  if (numberOfValues === 0) {
    return res.status(400).json({
      error: { message: `Request body must contain folder_name` },
    });
  }
  FolderService.updateFolder(req.app.get("db"), id, folderToUpdate)
    .then((numRowsAffected) => {
      res.status(204).end();
    })
    .catch(next);
});

app.get("/folders/:folder_id", jsonParser, (req, res, next) => {
  const id = req.params.folder_id;

  FolderService.getById(req.app.get("db"), id)
    .then((folder) => {
      if (!folder) {
        res.status(404).json({
          error: { message: `Folder with id ${id} does not exist.` },
        });
      }
      res.status(201).json(folder);
    })
    .catch(next);
});

app.post("/folders", jsonParser, (req, res, next) => {
  const { folder_name } = req.body;
  const newFolder = { folder_name };

  if (!folder_name) {
    return res.status(400).json({
      error: { message: `Please enter a field for folder_name` },
    });
  }
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
