const express = require('express')

const notesRouter = express.Router()
const jsonParser = express.json()

notesRouter
    .route('/')
    .get((req, res, next) => {
        res.json("what up")
    })