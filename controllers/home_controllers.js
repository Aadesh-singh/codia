const Post = require('../models/post');
const User = require('../models/user');


// // without async await
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    // if we do not populate the user of posts schema then we have to do something like this.

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('Erro in finding the Posts', err);
    //         return;
    //     }
    //     User.find({}, function(err, users){
    //         if(err){
    //             console.log('Error in finding the Users: ', err);
    //             return;
    //         }
            
    //         return res.render('hello.ejs', {
    //             AllPosts: posts,
    //             AllUsers: users 
    //         });
    //     });
    // });


    // After Populating the user in post schema user gets replaced by its object and we can simply use that object using dot notations.

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){     //.exec() is used when we write callback function in a querry like this i.e. saperate.
        if(err){
            console.log('Error in finding Posts: ', err);
        }
        // find the All user and send it to hello.ejs
        User.find({}, function(err, users){
            if(err){
                console.log('Error in finding the user: ', err);
                return;
            }
            return res.render('hello.ejs', {
                AllPosts: posts,
                user: req.user,
                all_Users: users
            });
        });
    });
}




module.exports.aadesh = function(req, res){
    return res.end('<h1>HI aadesh</h1>');
}