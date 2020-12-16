const express = require('express');
const loginRouter = express.Router();
const parser = require('body-parser');
const User = require('../models/user');
loginRouter.use(parser.json());

loginRouter.get('/', (req, res) => {
  res.send('hi');
});

loginRouter.post('/seedUser', async (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(401).send('no fields');
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then(() => {
    res.send('ok');
  });
});

loginRouter.post('/login', async (req, res) => {});

module.exports = loginRouter;
