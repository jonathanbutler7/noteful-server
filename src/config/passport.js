const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/user');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const strategy = new JwtStrategy(opts, (payload, next) => {
  User.forge({ id: payload.id })
    .fetch()
    .then((user) => {
      next(null, user);
    });
});

passport.use(strategy);

module.exports = passport;
