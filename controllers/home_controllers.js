const Post = require('../models/post');
const User = require('../models/user');


// with async await
module.exports.home = async function(req, res){
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .populate({
            path: 'comments',
            populate: {
                path: 'likes'
            }
        }).populate('likes');

        let users = await User.find({})
        
        if(req.user){
            var fuser = await User.findById(req.user.id)
            .populate({
                path: 'friends',
                populate: {
                    path: 'to_user'
                }
            })
        }
        return res.render('hello.ejs', {
            AllPosts: posts,
            user: req.user,
            all_Users: users,
            fUser: fuser
        });            
    } catch(err){
        console.log("Error: ", err);
    }
}


module.exports.aadesh = function(req, res){
    return res.end('<h1>HI aadesh</h1>');
}