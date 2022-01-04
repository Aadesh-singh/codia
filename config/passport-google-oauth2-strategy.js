const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// Tell passport to use new strategy from googleAuth
passport.use(new googleStrategy({
    // clientID and clientSecret are Provided from google itself.
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url
    },
    // accessToken contains the token and refresh token does is when the token gets expired instead of telling user to sign in it obtains a renewed access token.
    function(accessToken, refreshToken, profile, done){    //Profile will contain the all user info from google
        // find user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){        //profile.emails[0].value ==> because google account can contain multiple emails
            if(err){
                console.log('Error in Google strategy-passport', err);
                return;
            }
            console.log(profile);
            // if found then set this user as req.user/sign-in the user.
            if(user){
                return done(null, user);
            } else{
                // if not found then create the user and set it to req.user
                User.create({
                    name: profile.displayName,          //displayName is Key for name of user
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')        //this line will use crypto module to create random hexadecimal passwords because password is a required field and it cannot be empty.
                }, function(err, user){
                    if(err){
                        console.log('Error in creating user: Google strategy-passport', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }

));

module.exports = passport;