// importing model
const User = require('../models/user');



// Rendering the Profiles page.
module.exports.profile = function(req, res){
    return res.render('user_profile.ejs');
}

// Rendering the signup page.
module.exports.signup = function(req, res){
    return res.render('signup.ejs');
}
// Rendering the signIn page.
module.exports.signin = function(req, res){
    return res.render('signin.ejs');
}

// Get the Sign-up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        // if user does not exist create it.
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return;}
                console.log(user);
                return res.redirect('/user/sign-in');
            });
        }
        else{
            
            return res.redirect('back');
        }
    });
    
}

// Create session

module.exports.createSession = function(req, res){
    return res.redirect('/user/profile');
}

// destroy session

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}