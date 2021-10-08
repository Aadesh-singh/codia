// importing model
const User = require('../models/user');



// Rendering the Profiles page.
module.exports.profile = function(req, res){
    console.log(req.cookies);
    if(req.cookies.user_id){
        User.findOne({_id: req.cookies.user_id}, function(err, user){
            if(err){ console.log('Error in fetching the details: ', err); return;}
            if(user){
                console.log(user);
                return res.render('profile.ejs', {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    id: user._id,
                    createdAt: user.createdAt
                });
            }
            else{
                res.redirect('back');
            }
        });
    }else{
        return res.redirect('/user/sign-in');
    }
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
    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('User not found'); return;}
        //handle user found
        if(user){
            //handle password mismatch
            if(user.password != req.body.password){
                console.log('wrong password');
                return res.redirect('back');
            }
            // if password match then handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        }
    })
}

// handling signout

module.exports.signout = function(req, res){
    res.clearCookie("user_id");
    return res.redirect('/user/sign-in');
}