const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// load up the user model
const User = require('../model/user');

// load the auth variables
const config = require('../config');

module.exports = function (app, passport) {
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            return done(err, user);
        });
    });
    // =========================================================================
    // Facebook ================================================================
    // =========================================================================

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
                        return done(err);
                    }
                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        let newUser = new User();
                        
                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                        // save our user to the database
                        newUser.save(function (err) {
                            if (err) {
                                return done(err);
                            }
                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================

    passport.use(new GoogleStrategy({

            clientID: config.SECRETS.google_auth.client_ID,
            clientSecret: config.SECRETS.google_auth.client_secret,
            callbackURL: config.SECRETS.google_auth.callbackURL,
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

        },
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({
                        'google.id': profile.id
                    }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.google.token) {
                                user.google.token = token;
                                user.google.name = profile.displayName;
                                console.log(user.google.name);
                                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                                user.save(function (err) {
                                    if (err)
                                        return done(err);

                                    return done(null, user);
                                });
                            }

                            return done(null, user);
                        } else {

                            let newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.google.token = token;
                            newUser.google.name = profile.displayName;
                            console.log(newUser.google.id);
                            newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            newUser.save(function (err) {
                                if (err) return done(err);

                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    let user = req.user; // pull the user out of the session
                    user.google.id = profile.id;
                    user.google.token = token;
                    user.google.name = profile.displayName;
                    console.log(user.google.name);
                    user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email


                    user.save(function (err) {
                        if (err) return done(err);

                        return done(null, user);
                    });
                }
            });
        }));
    //=======================================================================================================
    //routes for both sign in
    //=======================================================================================================

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'public_profile']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: 'http://localhost:3000/dashboard',
        failureRedirect: '/',
        failureFlash: true
    }));

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: 'http://localhost:3000/dashboard',
            failureRedirect: '/'
        }));
    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return passport;
};