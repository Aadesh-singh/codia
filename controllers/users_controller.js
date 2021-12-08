// importing model
const User = require('../models/user');



// Rendering the Profiles page.
module.exports.profile = async function(req, res){
    try {
        const user = await User.findById(req.params.id);

        return res.render('user_profile.ejs', {
            profile_user: user
        });
    } catch (err) {
        req.flash('error', err);
        return;
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
module.exports.create = async function(req, res){
    try {
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'Pasword does not match with confirm password');
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            const users = await User.create(req.body);
            req.flash('success', 'User Created Successfully!!');
            return res.redirect('/user/sign-in');
        }
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Create session

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

// destroy session

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!!');
    return res.redirect('/');
}

// updateUser

module.exports.update = async function(req, res){
    try {
        if(req.user.id == req.params.id){
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
            
            req.flash('success', 'User Updated Successfully');
            return res.redirect('back');
        } else{
            req.flash('error', 'You are Not Authorised for this act');
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}