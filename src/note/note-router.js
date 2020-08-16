const express = require("express");
const NoteService = require("./note-service");
const path = require("path");

const noteRouter = express.Router();
const jsonParser = express.json();

noteRouter
  .route("/")
  .get((req, res, next) => {
    NoteService.getAllNotes(req.app.get("db"))
      .then((notes) => {
        res.json(notes);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { note_name, content, folder_id } = req.body;
    const newNote = { note_name, content, folder_id };

    if (typeof folder_id !== "number") {
      return res.status(400).json({
        error: { message: `Folder ID must be a number` },
      });
    }
    for (const [key, value] of Object.entries(newNote)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }
    }

    NoteService.insertNote(req.app.get("db"), newNote)
      .then((note) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder_id}`))
          .json(newNote);
      })
      .catch(next);
  });

noteRouter
  .route("/:note_id")
  .get(jsonParser, (req, res, next) => {
    const id = req.params.note_id;

    NoteService.getById(req.app.get("db"), id)
      .then((note) => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Article with id ${id} does not exist.` },
          });
        }
        res.status(201).json(note);
      })
      .catch(next);
  })
  .delete(jsonParser, (req, res, next) => {
    const id = req.params.note_id;
    NoteService.deleteNote(req.app.get("db"), id).then((id) => {
      if (!id) {
        res.status(404).json({
          error: {
            message: `Can't delete note with id ${req.params.note_id} as it doesn't exist.`,
          },
        });
      }
      res.status(204).end();
    });
  })
  .patch(jsonParser, (req, res, next) => {
    const id = req.params.note_id;
    const { note_name, content, note_id } = req.body;
    const noteToUpdate = { note_name, content, note_id };
    console.log(noteToUpdate);
    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length;
  
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain one of the following: note_name, content`,
        },
      });
    }
    NoteService.updateNote(req.app.get("db"), id, noteToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })

module.exports = noteRouter;
