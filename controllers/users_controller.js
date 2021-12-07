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
        console.log('Error: ', err);
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
            console.log()
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            const users = await User.create(req.body);
            console.log('User created Successfully', users);
            return res.redirect('/user/sign-in');
        }
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating user: ', err);
        return res.redirect('back');
    }
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

module.exports.update = async function(req, res){
    try {
        if(req.user.id == req.params.id){
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
            console.log('user updated successfully: ',user);
            return res.redirect('back');
        } else{
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log('Error: ',err);
        return res.redirect('back');
    }
}