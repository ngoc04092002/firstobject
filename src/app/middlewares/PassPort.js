const passport = require('passport');
const LoginSocial = require('../models/PassPort');
const jwt = require('jsonwebtoken');


function PassPort(app) {
  //Facebook Incomplete
  const FacebookStrategy = require('passport-facebook').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  ));

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/home');
    });

  //Google
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
    function (accessToken, refreshToken, profile, done) {
      
      const login = new LoginSocial({
        fullname: profile.displayName,
        googleId: profile.id, Image: profile.photos[0].value
      })
      LoginSocial.findOne({ googleId: profile.id })
        .then((user) => { if (!user) login.save() })

      done(null, profile)

    }
  ));
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
      successRedirect: '/home'
    })
  );
}

module.exports = PassPort;