const router = require('express').Router();
const folders = require('./folder/folder-router');
const note = require('./note/note-router');
const login = require('./login/login-router');

router.use('/folders', folders);
router.use('/login', login);
router.use('/notes', note);

module.exports = router;
