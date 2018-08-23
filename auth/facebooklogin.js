var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../model/user');

// load the auth variables
var config = require('../config');

module.exports = function (app, passport) {


    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID: config.SECRETS.facebook_auth.client_ID,
            clientSecret: config.SECRETS.facebook_auth.client_secret,
            callbackURL: config.SECRETS.facebook_auth.callbackURL,
            profileFields: ['id', 'displayName', 'name', 'gender', 'email', 'photos'],
            enableProof: true
        },

        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {
                console.log(profile);
                // find the user in the database based on their facebook id
                User.findOne({
                    'facebook.id': profile.id
                }, function (err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err) {
                        done(err);
                    }

                    //this needs checking, please double check
                    if (!user) {
                        done(null, false)
                    }

                    // if the user is found, then log them in
                    if (user) {
                        done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                        // save our user to the database
                        newUser.save(function (err) {
                            if (err) {
                                done(err);
                            }
                            // if successful, return the new user
                            done(null, newUser);
                        });
                    }

                });
            });

        }));
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'public_profile']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }));

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    return passport;
};