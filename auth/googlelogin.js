var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../model/user');
var config = require('../config');

module.exports = function (app, passport) {

  passport.serializeUser(function (user, done) {
      done(null, user.id);
  });


  passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
  });

  passport.use(new GoogleStrategy({
      clientID: config.SECRETS.google_auth.client_ID,
      clientSecret: config.SECRETS.google_auth.client_secret,
      callbackURL: config.SECRETS.google_auth.callbackURL,
      profileFields: ['id', 'displayName', 'name', 'gender', 'email', 'photos'],
      enableProof: true
  },
      function (token, refreshToken, profile, done) {
        process.nextTick(function () {
          console.log(profile);

          User.findOne({'google.id': profile.id}, function (err, user) {
             if (err) {
              done(err);
             }
             if (!user) {
              done(null, false)
             }
             if (user) {
              done(null, user);
             }
             else {
               var newUser = new User();
               newUser.google.id = profile.id;
               newUser.google.token = token;
               newUser.google.name = profile.name.givenName + ' ' + profile.name.familyName;
               newUser.google.email = profile.emails[0].value;

               newUser.save(function (err) {
                 if (err) {
                   done(err);
                 }
                 done(null, newUser);
               });
             }
          });
        });
      }));

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'public_profile']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/dashboard',
      failureRedirect: '/'
    })
  );

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

return passport;
};
