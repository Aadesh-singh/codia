const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport

passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    function(email, password, done){
        // find a user to establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in find user');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('invalid username/password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

// serializing(encrypting) the user to decide which key to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserializing(decrypting) the user to decide which key to be kept in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('errror in finding the user');
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = passport;