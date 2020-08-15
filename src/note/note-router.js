const express = require('express')

const noteRouter = express.Router()
const jsonParser = express.json()

noteRouter
    .route('/notes')
    .get((req, res, next) => {
        res.json("what up")
    })