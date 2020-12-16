const express = require('express');
const FolderService = require('./folder-service');

const folderRouter = express.Router();
const jsonParser = express.json();

folderRouter
  .route('/')
  .get((req, res, next) => {
    FolderService.getAllFolders(req.app.get('db'))
      .then((folders) => {
        res.json(folders);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { folder_name } = req.body;
    const newFolder = { folder_name };

    if (!folder_name) {
      return res.status(400).json({
        error: { message: `Please enter a field for folder_name` },
      });
    }
    FolderService.insertFolder(req.app.get('db'), newFolder)
      .then((folder) => {
        res.status(201).json(folder);
      })
      .catch(next);
  });

folderRouter
  .route('/:folder_id')
  .get(jsonParser, (req, res, next) => {
    const id = req.params.folder_id;

    FolderService.getById(req.app.get('db'), id)
      .then((folder) => {
        if (!folder) {
          res.status(404).json({
            error: { message: `Folder with id ${id} does not exist.` },
          });
        }
        res.status(201).json(folder);
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const id = req.params.folder_id;
    const { folder_name } = req.body;
    const folderToUpdate = { folder_name };

    const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length;

    if (numberOfValues === 0) {
      return res.status(400).json({
        error: { message: `Request body must contain folder_name` },
      });
    }
    FolderService.updateFolder(req.app.get('db'), id, folderToUpdate)
      .then((numRowsAffected) => {
        console.log(numRowsAffected);
        res.status(201).json({ numRowsAffected }).end();
      })
      .catch(next);
  })
  .delete(jsonParser, (req, res, next) => {
    const id = req.params.folder_id;

    FolderService.deleteFolder(req.app.get('db'), id).then(() => {
      res
        .status(201)
        .json({ message: `Deleted folder with ID: ${id}` })
        .end();
    });
  });

module.exports = folderRouter;
