// importing model
const User = require('../models/user');



// Rendering the Profiles page.
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('Error in finding user', err);
            return;
        }
        return res.render('user_profile.ejs', {
            profile_user: user
        });
    });
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
    return res.redirect('/');
}

// destroy session

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}

// updateUser

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body , function(err, user){
            if(err){
                console.log('Error in updating the user: ', err);
                return;
            }
            console.log(user);
            return res.redirect('/');
        });
    } else {
        return res.status(401).send('Unauthorized');
    }
}