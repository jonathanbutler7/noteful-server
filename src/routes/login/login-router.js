const express = require('express');
const loginRouter = express.Router();
const parser = require('body-parser');
const User = require('../../models/user');
const passport = require('../../config/passport');
const jwt = require('jsonwebtoken');
loginRouter.use(parser.json());

loginRouter.get('/', (req, res) => {
  res.send('hi');
});

loginRouter.post('/register', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).send('no fields');
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then(() => {
    res.status(200).send('ok');
  });
});

loginRouter.post('/gettoken', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).send('Fields not sent');
  }

  User.forge({ email: req.body.email })
    .fetch()
    .then((result) => {
      if (!result) {
        return res.status(400).send('user not found');
      }
      result
        .authenticate(req.body.password)
        .then((user) => {
          const payload = { id: user.id };
          const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
          res.send(token);
        })
        .catch((err) => {
          return res.status(401).send(err);
        });
    });
});

loginRouter.get(
  '/getUser',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log(req.user);
    res.send(req.user);
  }
);

loginRouter.post('/login', async (req, res) => {});

module.exports = loginRouter;
