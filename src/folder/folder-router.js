const express = require('express')

const folderRouter = express.Router()
const jsonParser = express.json()

folderRouter
    .route('/')
    .get((req, res, next) => {
        res.json("what up")
    })

module.exports = folderRouter